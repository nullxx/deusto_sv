# -*- coding: utf-8 -*-
import requests as r
import os
import json
import jsondiff
import threading
import sys
from time import sleep
correo = sys.argv[1]
password = sys.argv[2]

def is_json(myjson):
    try:
        json_object = json.loads(myjson)
    except ValueError as e:
        return False
    return True

fileName = "cached.dat"
time_loop = 60

print("""
.------------------------------------------.
|   Deusto Secretaría General v1.0.0       |
|   More info at: https://deusto.nullx.me  |
|   Developed by:                          |
|                _ _                       |
|    _ __  _   _| | |_  __                 |
|   | '_ \| | | | | \ \/ /                 |
|   | | | | |_| | | |>  <                  |
|   |_| |_|\__,_|_|_/_/\_\\                 |
.------------------------------------------.
""")

print("Comprobar calificaciones cada [{}] segundos".format(time_loop))
print("Guardada información en el archivo [{}]". format(fileName))
sleep(1)
print("\nIniciando con: \n\tUsuario: {}\n\tContraseña: {}".format(correo, "*" * len(password)))
def main():
    threading.Timer(time_loop, main).start()
    res = r.get("https://deusto.nullx.me/calificaciones.get?u={}&p={}".format(correo, password)).json()
    print(res)
    if (res["data"] != None):
        if (res["data"]["marks"] != None):
            if (len(res["data"]["marks"]) > 0):
                f = None
                fe = os.path.exists(fileName)
                if (fe):
                    with open(fileName, 'r') as file:
                        f = file.read()
                else:
                    f = open(fileName, "w")
                for i in range(len(res["data"]["marks"])):
                    pass
                if(fe and is_json(f)):
                        resq = jsondiff.diff(res["data"]["marks"], json.loads(f))
                        if (resq):
                            print("aaaa", resq)
                            print("Nuevas notas")
                            for i in resq.keys():
                                print("----------------------------------")
                                for e in res["data"]["marks"][i].keys():
                                    print('\t{}: {}'.format(e.title(), res["data"]["marks"][i][e]))
                                print("----------------------------------")
                            f = open(fileName, "w")
                            f.write(json.dumps(res["data"]["marks"]))
                            f.close()
                else:
                    f.write(json.dumps(res["data"]["marks"]))
                    f.close()

        else:
            print("No se encuentran las calificaciones")
    else:
        print("No hay data")
        
main()
