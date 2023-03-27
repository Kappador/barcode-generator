@echo off
call :lastarg %*
node app.js %LAST_ARG%
goto :eof

:lastarg
  set "LAST_ARG=%~1"
  shift
  if not "%~1"=="" goto lastarg
goto :eof