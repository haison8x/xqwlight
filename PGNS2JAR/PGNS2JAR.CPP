/*
PGNS2JAR - a XQBoss Jar Making Program
Designed by Morning Yellow, Version: 1.31, Last Modified: Jan. 2010
Copyright (C) 2004-2010 www.xqbase.com

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

#include <windows.h>
#include <shlobj.h>
#include <stdio.h>
#include <string.h>
#include "zip.h"

const int MAX_CHAR = 1024;
const char *const cszMidletVersion = "1.31";

// ������Ϣ
static struct {
  BOOL bBig5;                 // �Ƿ���
  char szTitle[MAX_CHAR];     // ���ױ���
  char szSrcFolder[MAX_CHAR]; // ������Դ�ļ���
  char szDstFolder[MAX_CHAR]; // ����Ŀ���ļ���
  char szJarFile[MAX_CHAR];   // �ֻ����׳����ļ�
} Pgns2Jar;

inline const char *CnTw(const char *szCn, const char *szTw) {
  return Pgns2Jar.bBig5 ? szTw : szCn;
}

// ���ļ�����ʱ��ֹ����
static void ErrorOpen(const char *szFile) {
  char szMsg[MAX_CHAR];
  sprintf(szMsg, CnTw("�޷����ļ� %s", "�L�k���}��� %s"), szFile);
  MessageBox(NULL, szMsg, CnTw("�ֻ�������������", "������лs�@�u��"), MB_ICONSTOP);
  ExitProcess(0);
}

// ��λ����Ŀ���ļ���
static void LocateDestFolder(void) {
  char *lpBackSlash;
  GetModuleFileName(NULL, Pgns2Jar.szDstFolder, MAX_PATH);
  lpBackSlash = strrchr(Pgns2Jar.szDstFolder, '\\');
  if (lpBackSlash == NULL) {
    strcpy(Pgns2Jar.szDstFolder, "PGNS2JAR");
  } else {
    strcpy(lpBackSlash, "\\PGNS2JAR");
  }
}

// ѡ��������Դ�ļ���
static bool ChooseSourceFolder(void) {
  char *lpBackSlash;
  BROWSEINFO bi;
  LPITEMIDLIST pidl;

  bi.hwndOwner = NULL;
  bi.pidlRoot = NULL;
  bi.pszDisplayName = NULL;
  bi.lpszTitle = CnTw("��ѡ����������(*.PGN)���ڵ��ļ���", "�п�ܶH�Ѵ���(*.PGN)�Ҧb�����");
  bi.ulFlags = BIF_RETURNONLYFSDIRS;
  bi.lpfn = NULL;
  bi.lParam = NULL;
  bi.iImage = 0;
  pidl = SHBrowseForFolder(&bi);
  if (!SHGetPathFromIDList(pidl, Pgns2Jar.szSrcFolder)) {
    return false;
  }

  // ��ȡ���ױ���
  lpBackSlash = strrchr(Pgns2Jar.szSrcFolder, '\\');
  if (lpBackSlash == NULL || lpBackSlash[1] == '\0') {
    strcpy(Pgns2Jar.szTitle, CnTw("�ޱ���", "�L���D"));
  } else {
    strcpy(Pgns2Jar.szTitle, lpBackSlash + 1);
  }
  return true;
}

// ѡ��Ҫ���ɵ��ֻ������ļ�
static bool ChooseJarFile(void) {
  char *lpFileName;
  OPENFILENAME ofn;

  strcpy(Pgns2Jar.szJarFile, Pgns2Jar.szTitle);
  strcat(Pgns2Jar.szJarFile, ".jar");
  memset(&ofn, 0, sizeof(OPENFILENAME));
  ofn.lStructSize = sizeof(OPENFILENAME);
  ofn.lpstrFilter = CnTw("�ֻ�Ӧ�ó��� (*.jar)\0*.jar\0�����ļ� (*.*)\0*.*\0",
      "������ε{��(*.jar)\0*.jar\0�Ҧ����(*.*)\0*.*\0");
  ofn.lpstrFile = Pgns2Jar.szJarFile;
  ofn.nMaxFile = MAX_PATH;
  ofn.lpstrTitle = CnTw("��ָ��Ҫ���ɵ��ֻ����׳���", "�Ы��w�n�ͦ���������е{��");
  ofn.lpstrDefExt = "jar";
  ofn.Flags = OFN_PATHMUSTEXIST + OFN_HIDEREADONLY + OFN_OVERWRITEPROMPT;

  while (true) {
    if (GetSaveFileName(&ofn) == 0) {
      return false;
    }

    // ����ļ����Ƿ�������
    lpFileName = strrchr(Pgns2Jar.szJarFile, '\\');
    lpFileName = (lpFileName == NULL ? Pgns2Jar.szJarFile : lpFileName + 1);
    if (MultiByteToWideChar(CP_ACP, 0, lpFileName, -1, NULL, 0) < (int) strlen(lpFileName)) {
      if (MessageBox(NULL, CnTw("�������ĵ�JAR�ļ�����ĳЩ�ֻ����޷�ʹ�ã��Ƿ������",
          "�t�����媺JAR���W�b�Y�Ǥ���W�L�k�ϥΡA�O�_�~��H"),
          CnTw("�ֻ�������������", "������лs�@�u��"), MB_OKCANCEL + MB_ICONWARNING) == IDCANCEL) {
        continue;
      }
    }
    return true;
  }
}

static void SearchFolder(const char *szSrcFolder, const char *szDstFolder);

// ������ָ�����ļ�
static void SearchFile(const char *szSrcFile, const char *szDstFolder, int nIndex, const WIN32_FIND_DATA &wfd) {
  int nFileLen;
  FILE *fpFileList;
  char *lpDstFile, *lpBackSlash;
  char szPgnFile[MAX_CHAR], szDstFile[MAX_CHAR], szTitle[MAX_CHAR];

  // ��szDstFile��λΪszDstFolder����strcpy(lpDstFile, ...)��λ�ļ�
  strcpy(szDstFile, szDstFolder);
  lpDstFile = szDstFile + strlen(szDstFolder);
  if (*(lpDstFile - 1) != '\\') {
    *lpDstFile = '\\';
    lpDstFile ++;
  }
  // ��FILELIST
  strcpy(lpDstFile, "FILELIST");
  fpFileList = fopen(szDstFile, "at");
  if (fpFileList == NULL) {
    ErrorOpen(szDstFile);
  }

  // ��ȡ�ļ�����
  lpBackSlash = strrchr(szSrcFile, '\\');
  if (lpBackSlash == NULL || lpBackSlash[1] == '\0') {
    strcpy(szTitle, CnTw("�ޱ���", "�L���D"));
  } else {
    strcpy(szTitle, lpBackSlash + 1);
  }

  if ((wfd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) == 0) {
    nFileLen = strlen(szSrcFile) - 4;
    if (nFileLen > 0 && strnicmp(szSrcFile + nFileLen, ".PGN", 4) == 0) {
      // ��PGN�ļ���д���ϼ��ļ��е�FILELIST��������֮
      fprintf(fpFileList, "%d.PGN=%s\n", nIndex, szTitle);
      sprintf(szPgnFile, "%d.PGN", nIndex);
      strcpy(lpDstFile, szPgnFile);
      CopyFile(szSrcFile, szDstFile, FALSE);
    }
  } else if (strcmp(wfd.cFileName, ".") != 0 && strcmp(wfd.cFileName, "..") != 0) {
    // ��Ŀ¼��д���ϼ��ļ��е�FILELIST��������������֮
    fprintf(fpFileList, "/%d=%s\n", nIndex, szTitle);
    sprintf(szPgnFile, "%d", nIndex);
    strcpy(lpDstFile, szPgnFile);
    CreateDirectory(szDstFile, NULL);
    SearchFolder(szSrcFile, szDstFile);
  }
  fclose(fpFileList);
}

// ����ָ���ļ���
static void SearchFolder(const char *szSrcFolder, const char *szDstFolder) {
  HANDLE hFind;
  WIN32_FIND_DATA wfd;
  int nIndex;
  char *lpSrcFile;
  char szSrcFile[MAX_CHAR];

  // ��szSrcFile��λΪszSrcFolder����strcpy(lpSrcFile, ...)��λ�ļ�
  strcpy(szSrcFile, szSrcFolder);
  lpSrcFile = szSrcFile + strlen(szSrcFolder) + 1;
  *(lpSrcFile - 1) = '\\';
  // szSrcFile��Ϊ...\*����Ϊ��������
  strcpy(lpSrcFile, "*");
  hFind = FindFirstFile(szSrcFile, &wfd);
  if (hFind != INVALID_HANDLE_VALUE) {
    strcpy(lpSrcFile, wfd.cFileName);
    SearchFile(szSrcFile, szDstFolder, 1, wfd);
    nIndex = 2;
    while (FindNextFile(hFind, &wfd)) {
      strcpy(lpSrcFile, wfd.cFileName);
      SearchFile(szSrcFile, szDstFolder, nIndex, wfd);
      nIndex ++;
    }
  }
  FindClose(hFind);
}

static void SearchFolderToDelete(const char *szDstFolder);

// ������ָ�����ļ�����ɾ��
static void SearchFileToDelete(const char *szDstFile, const WIN32_FIND_DATA &wfd) {
  if ((wfd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) == 0) {
    DeleteFile(szDstFile);
  } else if (strcmp(wfd.cFileName, ".") != 0 && strcmp(wfd.cFileName, "..") != 0) {
    SearchFolderToDelete(szDstFile);
    RemoveDirectory(szDstFile);
  }
}

// ����ָ���ļ��м���ɾ��
static void SearchFolderToDelete(const char *szDstFolder) {
  HANDLE hFind;
  WIN32_FIND_DATA wfd;
  char *lpDstFile;
  char szDstFile[MAX_CHAR];

  // ��szDstFile��λΪszDstFolder����strcpy(lpDstFile, ...)��λ�ļ�
  strcpy(szDstFile, szDstFolder);
  lpDstFile = szDstFile + strlen(szDstFolder) + 1;
  *(lpDstFile - 1) = '\\';
  // szDstFile��Ϊ...\*����Ϊ��������
  strcpy(lpDstFile, "*");
  hFind = FindFirstFile(szDstFile, &wfd);
  if (hFind != INVALID_HANDLE_VALUE) {
    strcpy(lpDstFile, wfd.cFileName);
    SearchFileToDelete(szDstFile, wfd);
    while (FindNextFile(hFind, &wfd)) {
      strcpy(lpDstFile, wfd.cFileName);
      SearchFileToDelete(szDstFile, wfd);
    }
  }
  FindClose(hFind);
}

// ��ANSIת��ΪUTF8
static const char *Ansi2Utf8(char *szUtf8, const char *szAnsi) {
  wchar_t wszUnicode[MAX_CHAR];
  MultiByteToWideChar(CP_ACP, 0, szAnsi, -1, wszUnicode, MAX_CHAR);
  WideCharToMultiByte(CP_UTF8, 0, wszUnicode, -1, szUtf8, MAX_CHAR, NULL, NULL);
  return szUtf8;
}

// ����MetaFile�ļ�
static void CreateManifest(void) {
  FILE *fpManifest;
  char szTitle[MAX_CHAR], szDescript[MAX_CHAR], szManifest[MAX_CHAR];

  Ansi2Utf8(szTitle, Pgns2Jar.szTitle);
  Ansi2Utf8(szDescript, CnTw("����С��ʦ�ֻ�����", "�H�Ѥp�Ův�������"));
  strcpy(szManifest, Pgns2Jar.szDstFolder);
  strcat(szManifest, "\\META-INF\\MANIFEST.MF");
  fpManifest = fopen(szManifest, "wt");
  if (fpManifest == NULL) {
    ErrorOpen(szManifest);
  }

  fprintf(fpManifest, "Manifest-Version: 1.0\n");
  fprintf(fpManifest, "MIDlet-1: %s, /images/xqboss.png, xqboss.XQBossMIDlet\n", szTitle);
  fprintf(fpManifest, "MIDlet-Name: %s\n", szTitle);
  fprintf(fpManifest, "MIDlet-Description: %s - %s\n", szTitle, szDescript);
  fprintf(fpManifest, "MIDlet-Vendor: www.xqbase.com\n");
  fprintf(fpManifest, "MIDlet-Info-URL: http://www.xqbase.com/\n");
  fprintf(fpManifest, "MIDlet-Icon: /images/xqboss.png\n");
  fprintf(fpManifest, "MIDlet-Version: %s\n", cszMidletVersion);
  fprintf(fpManifest, "MicroEdition-Configuration: CLDC-1.0\n");
  fprintf(fpManifest, "MicroEdition-Profile: MIDP-2.0\n");

  fclose(fpManifest);
}

// ����JAD�ļ���ͬʱɾ��MANIFEST.MF
static void CreateJadFile(void) {
  int nFileLen;
  FILE *fpJarFile, *fpJadFile;
  char *lpBackSlash;
  char szManifest[MAX_CHAR], szJadFile[MAX_CHAR], szJarFile[MAX_CHAR];

  // ����ļ�������JAR��β����ô������JAD�ļ�
  nFileLen = strlen(Pgns2Jar.szJarFile) - 4;
  if (nFileLen <= 0 || strnicmp(Pgns2Jar.szJarFile + nFileLen, ".JAR", 4) != 0) {
    return;
  }

  // ��MANIFEST.MF����ΪJAD�ļ�
  strcpy(szManifest, Pgns2Jar.szDstFolder);
  strcat(szManifest, "\\META-INF\\MANIFEST.MF");
  strncpy(szJadFile, Pgns2Jar.szJarFile, nFileLen);
  strcpy(szJadFile + nFileLen, ".jad");
  DeleteFile(szJadFile);
  MoveFile(szManifest, szJadFile);

  // ��JAR�ļ������ֽ���д��JAD��
  fpJarFile = fopen(Pgns2Jar.szJarFile, "rb");
  if (fpJarFile == NULL) {
    ErrorOpen(Pgns2Jar.szJarFile);
  }
  fseek(fpJarFile, 0, SEEK_END);  
  lpBackSlash = strrchr(Pgns2Jar.szJarFile, '\\');
  Ansi2Utf8(szJarFile, lpBackSlash == NULL ? Pgns2Jar.szJarFile : lpBackSlash + 1);

  fpJadFile = fopen(szJadFile, "at");
  if (fpJadFile == NULL) {
    ErrorOpen(szJadFile);
  }
  fprintf(fpJadFile, "MIDlet-Jar-Size: %d\n", ftell(fpJarFile));
  fprintf(fpJadFile, "MIDlet-Jar-URL: %s\n", szJarFile);
  fclose(fpJadFile);

  fclose(fpJarFile);
};

// InfoZip����
static int WINAPI PrintFunction(LPSTR, unsigned long) {
  return 0;
}
const char *cszCurrDir[1] = {"."};

// ��InfoZip����JAR�ļ�
void CreateJarFile(void) {
  ZIPUSERFUNCTIONS zuf;
  ZPOPT zpopt;
  ZCL zcl;

  memset(&zuf, 0, sizeof(ZIPUSERFUNCTIONS));
  zuf.print = PrintFunction;
  ZpInit(&zuf);

  memset(&zpopt, 0, sizeof(ZPOPT));
  zpopt.szRootDir = Pgns2Jar.szDstFolder;
  zpopt.fExtra = TRUE;
  zpopt.fRecurse = 1;

  memset(&zcl, 0, sizeof(ZCL));
  zcl.argc = 1;
  zcl.lpszZipFN = Pgns2Jar.szJarFile;
  zcl.FNV = (char **) cszCurrDir;
  ZpArchive(zcl, &zpopt);
}

// ������
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
  char szPgnFolder[MAX_CHAR], szSrcCharTab[MAX_CHAR], szDstCharTab[MAX_CHAR], szMsg[MAX_CHAR];

  // ȷ����ǰ����ϵͳ�ַ���
  Pgns2Jar.bBig5 = GetOEMCP() == 950;

  // ��λ����Ŀ���ļ���
  LocateDestFolder();
  // ���û�ѡ��������Դ�ļ���
  if (!ChooseSourceFolder()) {
    return 0;
  }
  // ���û�ѡ���ֻ����׳����ļ�
  if (!ChooseJarFile()) {
    return 0;
  }
  // ���������������ļ�
  strcpy(szPgnFolder, Pgns2Jar.szDstFolder);
  strcat(szPgnFolder, "\\PGNS");
  CreateDirectory(szPgnFolder, NULL);
  SearchFolder(Pgns2Jar.szSrcFolder, szPgnFolder);
  // �������
  strcpy(szSrcCharTab, Pgns2Jar.szDstFolder);
  strcat(szSrcCharTab, CnTw(".DAT\\GB.DAT", ".DAT\\BIG5.DAT"));
  strcpy(szDstCharTab, Pgns2Jar.szDstFolder);
  strcat(szDstCharTab, "\\xqboss\\CHARTAB.DAT");
  CopyFile(szSrcCharTab, szDstCharTab, FALSE);
  // ����MANIFEST.MF��JAR�ļ���JAD�ļ�
  CreateManifest();
  CreateJarFile();
  CreateJadFile();
  // ɾ��Ŀ���ļ���
  SearchFolderToDelete(szPgnFolder);
  RemoveDirectory(szPgnFolder);

  sprintf(szMsg, CnTw("�ֻ����� %s(.jad) �����ɹ���", "�������%s(.jad)�s�@���\�C"), Pgns2Jar.szJarFile);
  MessageBox(NULL, szMsg, CnTw("�ֻ�������������", "������лs�@�u��"), MB_ICONINFORMATION);
  return 0;
}