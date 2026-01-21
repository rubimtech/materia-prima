# ════════════════════════════════════════════════════════════════════════════
#  ORDO RUBIM: CHRONOS PROTOCOL (WINDOWS v2.2 - XLII EDITION)
#  "Materia Obscura. Dictatura. Accuratio."
# ════════════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"
$BaseUrl = "https://raw.githubusercontent.com/rubimtech/materia-prima/main"

# Вход в терминал
Clear-Host
Write-Host ">>> ORDO RUBIM: CHRONOS INTERFACE" -ForegroundColor Cyan
Write-Host "    [01]  FERRUM      (C++ / Kernel)"
Write-Host "    [02]  STABILIS    (Rust / Logic)"
Write-Host "    [03]  ORDO        (C# / Structure)"
Write-Host "    [04]  VOX         (Python / Intellect)"
Write-Host "    [05]  MEMORIA     (SQL / Persistence)"
Write-Host "    [06]  COR         (Ruby / Essence)"
Write-Host "    [07]  MILITIA     (Kotlin / Scaling)"
Write-Host "    [08]  FORMA       (Swift / Aesthetic)"
Write-Host "    [09]  CLARITAS    (TS / Connectivity)"
Write-Host "    [10]  MUNDUS      (Go / Execution)"

$Selection = Read-Host "`n>>> INPUT DESIGNATION"

# Маппинг 10 эшелонов
$FileMap = @{
    "1"  = "OrdoRubim.hpp";
    "2"  = "OrdoRubim.rs";
    "3"  = "OrdoRubim.cs";
    "4"  = "OrdoRubim.py";
    "5"  = "OrdoRubim.sql";
    "6"  = "OrdoRubim.rb";
    "7"  = "OrdoRubim.kt";
    "8"  = "OrdoRubim.swift";
    "9"  = "OrdoRubim.ts";
    "10" = "OrdoRubim.go"
}

if (-not $FileMap.ContainsKey($Selection)) {
    Write-Host "!!! VIOLATION DETECTED. ABORTING." -ForegroundColor Red
    exit
}

$TargetFile = $FileMap[$Selection]
$RepoUrl = "$BaseUrl/$TargetFile"

# 1. Запуск Хронометра
$Sw = [System.Diagnostics.Stopwatch]::StartNew()
Write-Host "`n>>> INITIALIZING SEQUENCE..." -ForegroundColor DarkGray
Start-Sleep -Milliseconds 300

# 2. Синхронизация (15 итераций резонанса)
Write-Host -NoNewline ">>> RESONANCE SYNC: " -ForegroundColor Cyan
for ($i = 0; $i -lt 15; $i++) {
    Write-Host -NoNewline "█" -ForegroundColor DarkCyan
    Start-Sleep -Milliseconds (Get-Random -Minimum 20 -Maximum 80)
}
Write-Host " [COMPLETED]" -ForegroundColor Green

# 3. Инвокация данных
try {
    $Content = Invoke-RestMethod -Uri $RepoUrl
} catch {
    Write-Host "`n!!! FATAL: The Void is silent ($RepoUrl)." -ForegroundColor Red
    exit
}

# 4. Фиксация в Малхут
$Sw.Stop()
$TimeSpan = $Sw.Elapsed.TotalSeconds.ToString("N4")

# 5. Терминальный вывод
Clear-Host
Write-Host $Content -ForegroundColor Gray
Write-Host "`n========================================================" -ForegroundColor DarkGray
Write-Host ">>> SOURCE: $TargetFile" -ForegroundColor Green
Write-Host ">>> TIME INVESTED: $TimeSpan SECONDS." -ForegroundColor Cyan
Write-Host ">>> SIGNATURE: 406976513" -ForegroundColor Red
Write-Host "========================================================" -ForegroundColor DarkGray