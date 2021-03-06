<?php

return [
    //Adatbázis kapcslatok
    "databaseInfo"              => [
        "main"                  => [
            "server"            => "localhost",
            "port"              => 3306,
            "username"          => "root",
            "password"          => "",
            "database"          => "catalog"
        ],
    ],
    "databaseInfoLocalhost"     => [
        "main"                  => [
            "server"            => "localhost",
            "port"              => 3306,
            "username"          => "root",
            "password"          => "",
            "database"          => "catalog"
        ],
    ],

    //Rögzített útvonalnevek
    "loginPage"                 => "loginPage",
    "mainPage"                  => "mainPage",

    //Egyelőre használaton kívűl.
    "isApi"                     => false,

    //True esetén a használathoz bejelentkezett felhasználó kell.
    //Ha session-ből nem tudja a Request osztály User paraméterét betölteni, akkor azonnal átirányít a login oldalra.
    //Ha nincs login oldal regisztrálva az index.php-ban, akkor 404-es hibakód lesz a válasz.
    "hasUser"                   => false,

    //A session érvényességének ideje órában.
    "sessionExpirationInterval" => 8,

];
