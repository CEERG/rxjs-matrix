Access to [BoredApi](https://www.boredapi.com/documentation) via console commands.


<details>
<summary><b>Build</b></summary>

    docker-compose build

</details>


<details>
<summary><b>Deploy</b></summary>

    docker-compose up -d

Dependencies will be auto installed, progress can be observed here:

    docker logs -ft frondend-npm_install_update-webpack

Container will restart once, it means that the command above might be needed to be executed again. Something like `"webpack 5.70.0 compiled successfully in 9106 ms"` means the application is ready

</details>


<details>
<summary><b>Usage</b></summary>

Application is here: http://127.17.0.1/

Unfortunately the game won't stop itself when the game is over according to the rules

</details>


<details>
<summary><b>After Usage</b></summary>

    docker-compose down -t 0

</details>