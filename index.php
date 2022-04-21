<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Catalog\AlbumController;
use Catalog\ComposerController;
use Catalog\PublisherController;
use Main\MainController;
use SteveEngine\Config;
use SteveEngine\Data\Database;
use SteveEngine\Router\Map;
use SteveEngine\Router\Router;
use SteveEngine\Safety\Request;

//Az autoloader indítása
include "vendor/autoload.php";

// A konfigurációs adatok alapján a Config osztály létrehozása
Config::new()
    ->prepare()
    ->set("appPath", __DIR__);

//A közvetlen elérésű funckciók betöltése
include "vendor/steveaccount/steveengine/Kernel.php";

//A Database osztály inicializálása
if (strpos(config()->get("appPath"), "\\")) {
    // Develope mode
    Database::new()->prepare(config()->get("databaseInfoLocalhost")["main"]);
} else {
    // Prod mode
    Database::new()->prepare(config()->get("databaseInfo")["main"]);
}

//A Router osztály inicializálása, az útvonalak regisztrálása
$router = Router::new();
$router->map()
    ->get   ("/", MainController::class, "mainPage", "mainPage")
    ->post  ("/getModal", "Main\ModalController", "getModal", "getModal", [])

    ->group     ("/albums", "", (new Map)
        ->post  ("/", AlbumController::class, "getAlbumsPage", "mainPage")
        ->post  ("/list", AlbumController::class, "getList")
        ->post  ("/get", AlbumController::class, "getAlbum")
        ->post  ("/new", AlbumController::class, "newAlbum")
        ->post  ("/update", AlbumController::class, "updateAlbum")
    )

    ->group     ("/composers", "", (new Map)
        ->post  ("/", ComposerController::class, "getComposersPage", "getComposersPage")
        ->post  ("/list", ComposerController::class, "getList")
        ->post  ("/getListForSelect", ComposerController::class, "getListForSelect")
        ->post  ("/get", ComposerController::class, "getComposer")
        ->post  ("/new", ComposerController::class, "newComposer")
        ->post  ("/update", ComposerController::class, "updateComposer")
    )

    ->group     ("/publishers", "", (new Map)
        ->post  ("/", PublisherController::class, "getPublishersPage", "getPublishersPage")
        ->post  ("/list", PublisherController::class, "getList")
        ->post  ("/getListForSelect", PublisherController::class, "getListForSelect")
        ->post  ("/get", PublisherController::class, "getPublisher")
        ->post  ("/new", PublisherController::class, "newPublisher")
        ->post  ("/update", PublisherController::class, "updatePublisher")
    );

//A Request osztály létrehozása, a session, a user és a permission ellenőrzése
if (Request::new()->prepare()->check()) {
    $router->routeMe();
}


