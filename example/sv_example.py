# -*- coding: utf-8 -*-
import requests as r
import os
import json
import jsondiff
import threading
import sys
from time import sleep

if (len(sys.argv) != 3):
    print("\nUsage:\n\t python {} tususuario@opendeusto.es tu_contraseña\n".format(sys.argv[0]))
    exit(403)

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
print(chr(27) + "[2J") # clear screen
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

if os.path.exists(fileName):
    os.remove(fileName)

print("Comprobar calificaciones cada [{}] segundos".format(time_loop))
print("Guardada información en el archivo [{}]". format(fileName))
sleep(1)
print("\nIniciando con: \n\tUsuario: {}\n\tContraseña: {}".format(correo, "*" * len(password)))

inited = False
def main():
    threading.Timer(time_loop, main).start()
    res = r.get("https://deusto.nullx.me/calificaciones.get?u={}&p={}".format(correo, password)).json()
    if (res["data"] != None):
        global inited
        if (inited == False):
            if (res["data"]["student"] != None):
                print("----- Datos del estudiante -----")
                print(f'\tNombre: {res["data"]["student"]["fullName"]}')
                print(f'\tNIP: {res["data"]["student"]["nip"]}')
                print(f'\tFacultad: {res["data"]["student"]["faculty"]}')
                print(f'\tTipo de estudios: {res["data"]["student"]["studyType"]}')
                print(f'\tCursando: {res["data"]["student"]["syllabus"]}')
                print(f'\tEstado: {res["data"]["student"]["fileStatus"]}')
                print(f'\tPermanencia: {res["data"]["student"]["permanency"]}')
                print(f'\tDNI: {res["data"]["student"]["dni"]}')
                print(f'\tNIA: {res["data"]["student"]["nia"]}')
                print(f'\tRama: {res["data"]["student"]["studiesBranch"]}')
                print(f'\tEstudios: {res["data"]["student"]["studies"]}')
                print(f'\tEspecialidad: {res["data"]["student"]["specialty"]}')
                print(f'\tGrupo censal: {res["data"]["student"]["censusGroup"]}')
                inited = True
        if (res["data"]["marks"] != None):
            if (len(res["data"]["marks"]) > 0):
                f = None
                fe = os.path.exists(fileName)
                if (fe):
                    with open(fileName, 'r') as file:
                        f = file.read()
                else:
                    f = open(fileName, "w")

                if(fe and is_json(f)):
                        resq = jsondiff.diff(res["data"]["marks"], json.loads(f))
                        if (resq):
                            print("Ha habido cambios en las notas :)")
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
