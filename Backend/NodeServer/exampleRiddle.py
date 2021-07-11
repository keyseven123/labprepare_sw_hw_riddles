import requests

url = 'http://localhost:2999'

riddleInfo = {
    'name' : "EXAMPLE",
    'description' : "Dies ist ein Beispielrätsel in Python - der Schlangensprache",
    'difficulty' : 1,
    'completionMax': 5,
}

riddleHint = {
    'name' : "Schon mal das probiert? \n Ein und wieder ausschalten!",
    'contentType' : "application/json",
}

riddleDescription = {
    'name' : "description zeugs",
    'contentType' : "application/json"
}

riddleExplanation = {
    'name' : "description zeugs",
    'contentType' : "application/json"
}

x = requests.post(url + "/createRiddle", json=riddleInfo)   # the answer includes the given riddleID

print("x: ", x.text)    # should be a number greater equal 0

riddleId = x.text
y = requests.post(url + "/addHint/" + str(riddleId), json = riddleHint)
print("y: ", y)     # should be <Response [200]>

z = requests.post(url + "/completeRiddle/" + str(riddleId)) # increases completion status by 1

print("z: ", z)     # should be <Response [200]>

print(requests.get(url).text)   # here you can see all registered riddles

# more stuff

requests.post(url + "/addDescription/" + str(riddleId), json=riddleDescription)
requests.post(url + "/addExplanation/" + str(riddleId), json=riddleExplanation)

print(requests.get(url).text)
