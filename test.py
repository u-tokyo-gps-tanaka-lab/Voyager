from voyager import Voyager

# You can also use mc_port instead of azure_login, but azure_login is highly recommended

openai_api_key = "your_key"

voyager = Voyager(
    mc_port=56819,
    openai_api_key=openai_api_key,
    env_request_timeout=100
)

# start lifelong learning
voyager.learn()

