
#!/bin/bash

SRC_PATH=/opt/app-root/src
for file_template in $(grep -rl '${[A-Z]*__' $SRC_PATH/* | sort -u)
do
  for env_variable in $(env | grep '^[A-Z]*__')
  do
    var_name=$(echo $env_variable | cut -f1 -d '=')
    var_value=$(echo $env_variable | cut -f2 -d '=')
    sed -i "s|\${$var_name}|${var_value}|g" $file_template
  done
done
exec nginx -g "daemon off;"
