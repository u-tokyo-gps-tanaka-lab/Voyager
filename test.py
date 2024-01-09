from voyager import Voyager

# You can also use mc_port instead of azure_login, but azure_login is highly recommended

openai_api_key = "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"

voyager = Voyager(
    mc_port=49488,
    openai_api_key=openai_api_key,
    env_request_timeout = 10
)

# start lifelong learning
voyager.learn()