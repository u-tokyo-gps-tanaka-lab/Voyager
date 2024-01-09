import requests

server = "http://127.0.0.1:3000"
#server = "http://localhost:3000"
reset_options = {'port': 49488, 'reset': 'hard', 'inventory': {}, 'equipment': [], 'spread': False, 'waitTicks': 20, 'position': None}
res = requests.post(
    f"{server}/start",
    json=reset_options,
    timeout=10,
    )