# Obtener la fecha y hora actuales en formato HH-MM-SS_DD-MM-YYYY
fecha_hora=$(date +%H-%M-%S_%d-%m-%Y)

# Ejecutar el comando 'screen'
screen

# Obtener la lista de procesos que están escuchando en el puerto 3000
procesos=$(lsof -t -i :3000)

# Si hay algún proceso en la lista, matarlos
if [ -n "$procesos" ]; then
  xargs kill -9 <<< "$procesos"
fi

# Crear la carpeta 'logs' si no existe
mkdir -p logs

# Eliminar todos los archivos de log que no sean los 10 más recientes
find logs -name "server*.log" -type f -printf "%AT %p\n" | sort -r -k1.1n | tail -n +11
find logs -name "error*.log" -type f -printf "%AT %p\n" | sort -r -k1.1n | tail -n +11

# Ejecutar el comando 'npm start' y redirigir el output a la carpeta 'logs' con el nombre de la fecha y hora actuales
npm start >>logs/"server_$fecha_hora".log 2>>logs/"error_$fecha_hora".log
