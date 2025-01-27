# Streaming-With-Throttling

Project made in order to learn nodejs streams and how to add throttling and avoid reaching rate limits of an API.

## Execution

Generate a csv file to be used as input for the `data-integration` project.

```shell
make generate-csv
```

Start the web server in the `webapi` project (dont need to change directory).

```shell
make start-server
```

Start straming data from the `data-integration` project.

```shell
make start-streaming
```

## Credits

This project was made following the tutorial of [Erick Wendel](https://www.youtube.com/watch?v=tNjmQxwD1TM).
