import requests

url = 'http://localhost:2999'

riddleInfo = {
    'name' : "EXAMPLE",
    'description' : "Dies ist ein Beispielrätsel in Python - der Schlangensprache",
    'difficulty' : 1
}

riddleHint = {
    'name' : "Schon mal das probiert?",
    'description' : "Einfach mal aus- und wieder einschalten."
}

x = requests.post(url + "/createRiddle", json=riddleInfo)   # the answer includes the given riddleID

print("x: ", x.text)    # should be a number greater equal 0

riddleId = x.text
y = requests.post(url + "/addHint/" + str(riddleId), json = riddleHint)
print("y: ", y)     # should be <Response [200]>

z = requests.post(url + "/completeRiddle/" + str(riddleId))

print("z: ", z)     # should be <Response [200]>

print(requests.get(url).text)   # here you can see all registered riddles
