#!/bin/bash
# ORDO RUBIM: CHRONOS PROTOCOL (UNIX v2.0)

BASE_URL="https://raw.githubusercontent.com/rubimtech/materia-prima/main"

# Функция времени
current_time() {
    if [[ "$OSTYPE" == "darwin"* ]]; then date +%s.%N; else date +%s.%N; fi
}

clear
echo -e "\033[1;36m>>> ORDO RUBIM: SELECT PARADIGM\033[0m"
echo "   [1] C++        [5] TypeScript"
echo "   [2] C#         [6] Python"
echo "   [3] Rust       [7] Kotlin"
echo "   [4] Ruby       [8] Swift"
echo ""
read -p ">>> INPUT DESIGNATION: " CHOICE

case $CHOICE in
  1) FILE="OrdoRubim.hpp" ;;
  2) FILE="OrdoRubim.cs" ;;
  3) FILE="OrdoRubim.rs" ;;
  4) FILE="OrdoRubim.rb" ;;
  5) FILE="OrdoRubim.ts" ;;
  6) FILE="OrdoRubim.py" ;;
  7) FILE="OrdoRubim.kt" ;;
  8) FILE="OrdoRubim.swift" ;;
  *) echo -e "\033[0;31m!!! INVALID INPUT.\033[0m"; exit 1 ;;
esac

REPO_URL="$BASE_URL/$FILE"

# 1. Старт
START_TIME=$(current_time)
echo -e "\n\033[1;30m>>> INITIALIZING LINK...\033[0m"

# 2. Визуализация
echo -ne "\033[0;36m>>> WEAVING: \033[0m"
for i in {1..20}; do echo -ne "▓"; sleep 0.03; done
echo -e "\033[0;32m [LOCKED]\033[0m"

# 3. Загрузка
CONTENT=$(curl -s $REPO_URL)

if [ -z "$CONTENT" ]; then
    echo -e "\033[0;31m!!! ERROR: Artifact not found.\033[0m"
    exit 1
fi

# 4. Стоп
END_TIME=$(current_time)
DURATION=$(echo "$END_TIME - $START_TIME" | bc 2>/dev/null || echo "CALC_ERR")

# 5. Вывод
clear
echo "$CONTENT"
echo -e "\033[1;30m========================================================\033[0m"
echo -e "\033[1;32m>>> ARTIFACT: $FILE\033[0m"
echo -e "\033[1;36m>>> TIME CONSUMED: ${DURATION} SECONDS.\033[0m"
echo -e "\033[0;31m>>> GATE ID: 406976513\033[0m"
echo -e "\033[1;30m========================================================\033[0m"