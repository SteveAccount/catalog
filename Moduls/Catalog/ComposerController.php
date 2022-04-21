<?php

namespace Catalog;

use Catalog\Models\Composer;
use SteveEngine\ControllerForModulSystem;

class ComposerController extends ControllerForModulSystem{
    public string $path = __DIR__;

    public function getComposersPage() {
        return $this->twig->render("composers.html.twig", [
            "tableInfo"     => include("Tables/composers.php")
        ]);
    }

    public function getList() {
        return response($this->getData("composers"));
    }

    public function newComposer() {
        return response(Composer::new(request()->all()));
    }

    public function updateComposer() {
        return response(Composer::modify(request()->all()));
    }

    public function getComposer() {
        return response(Composer::selectById(request()->only("id")));
    }

    public function getListForSelect() {
        return response(Composer::getListForSelect());
    }
}
