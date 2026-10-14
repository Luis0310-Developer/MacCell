@echo off
chcp 65001 >nul
echo ==============================================
echo   Subiendo cambios de MacCell a GitHub...
echo ==============================================
echo.

git add .
set /p commit_msg="Describe brevemente tus cambios (o presiona Enter para usar 'Actualizacion'): "
if "%commit_msg%"=="" set commit_msg=Actualizacion automatica

git commit -m "%commit_msg%"
git push origin main

echo.
echo ==============================================
echo   ¡Cambios subidos exitosamente a GitHub!
echo ==============================================
pause
