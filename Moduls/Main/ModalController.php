<?php

namespace Main;

use Administry\Models\Country;
use Administry\Models\MyCompany;
use Administry\Models\Partner;
use Administry\Models\StreetType;
use Catalog\Models\Composer;
use Catalog\Models\Publisher;
use Finance\Enums\PaymentModes;
use Finance\Models\Vat;
use SteveEngine\ControllerForModulSystem;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class ModalController extends ControllerForModulSystem {
    public function __construct(){
        $pathList   = [];
        $path       = config()->get("appPath") . DIRECTORY_SEPARATOR . "Moduls" . DIRECTORY_SEPARATOR . "*";
        $moduls     = glob($path, GLOB_ONLYDIR);
        foreach ($moduls as $modulPath){
            $path = $modulPath . DIRECTORY_SEPARATOR . "Templates";
            if (file_exists($path)){
                array_push($pathList, $path);
            }
        }

        $loader     = new FilesystemLoader($pathList);
        $this->twig = new Environment($loader);
    }

    public function getModal(){
        $modalName  = request()->only("modalName");
        try{
            if (method_exists($this, $modalName)){
                $params = $this->$modalName();
            } else{
                $params = [];
            }
            return $this->twig->render("$modalName.html.twig", $params);
        }catch(\Exception $e){
            return $this->twig->render("$modalName.html.twig");
        }
    }

    private function modalAlbum() : array {
        return [
            "composers"     => Composer::getListForSelect(),
            "publishers"    => Publisher::getListForSelect(),
        ];

    }
}