<?php

namespace Main;

use SteveEngine\ControllerForModulSystem;
use SteveEngine\Menu\Menu;

class MainController extends ControllerForModulSystem{
    public function mainPage() : string{
        // Menü
        $menu   = new Menu();

        return $this->twig->render("main.html.twig", [
            "menu"              => $menu->getMenuFromModuls(),
            "user"              => request()->user,
        ]);
    }
}