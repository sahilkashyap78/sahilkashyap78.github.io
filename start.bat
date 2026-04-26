@echo off
echo.
echo  Starting MarkerVideo AR...
echo.

:: Kill anything on port 3000 first
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /PID %%a /F >nul 2>&1
)

timeout /t 1 /nobreak >nul

:: Start the local server in a background window
start "MarkerVideo Server" cmd /k "cd /d %~dp0 && node server.js"

timeout /t 2 /nobreak >nul

echo  Server running on port 3000.
echo.
echo -------------------------------------------------------
echo  HTTPS link will appear below in a few seconds...
echo  Copy it and open in your desktop browser first.
echo  Then scan the QR code shown on that page with mobile.
echo -------------------------------------------------------
echo.

npx --yes localtunnel --port 3000
