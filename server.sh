# Obtener la fecha y hora actuales en formato HH-MM-SS_DD-MM-YYYY
fecha_hora=$(date +%H-%M-%S_%d-%m-%Y)

# Ejecutar el comando 'screen'. No es necesario
# screen

# Obtener la lista de procesos que están escuchando en el puerto 3000
procesos=$(lsof -t -i :3000)

# Si hay algún proceso en la lista, matarlos
if [ -n "$procesos" ]; then
  kill -9 "$procesos"
fi

# Crear la carpeta 'logs' si no existe
mkdir -p logs

# Eliminar todos los archivos de log que no sean los 10 más recientes
serverLogs=$(find logs -name "server*.log" -type f -printf "%T@ %p\n" | sort -k1,1nr | cut -d " " -f2 | tail -n +11)
if [ -n "$serverLogs" ]; then
  rm $serverLogs
fi

errorLogs=$(find logs -name "error*.log" -type f -printf "%T@ %p\n" | sort -k1,1nr | cut -d " " -f2 | tail -n +11)
if [ -n "$errorLogs" ]; then
  rm $errorLogs
fi

# Ejecutar el comando 'npm start' y redirigir el output a la carpeta 'logs' con el nombre de la fecha y hora actuales
npm i
npm start >>logs/"server_$fecha_hora".log 2>>logs/"error_$fecha_hora".log &

# Si el comando 'npm start' se ha ejecutado correctamente, imprimir "Deploy success"
if [ $? -eq 0 ]; then
  echo "Deploy success"
else
  # Si el comando 'npm start' ha devuelto un error, imprimir "Deploy error"
  echo "Deploy error"
fi