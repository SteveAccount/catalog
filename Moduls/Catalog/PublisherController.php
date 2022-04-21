<?php

namespace Catalog;

use Catalog\Models\Publisher;
use SteveEngine\ControllerForModulSystem;

class PublisherController extends ControllerForModulSystem {
    public string $path = __DIR__;

    public function getPublishersPage() {
        return $this->twig->render("publishers.html.twig", [
            "tableInfo"     => include("Tables/publishers.php")
        ]);
    }

    public function getList() {
        return response($this->getData("publishers"));
    }

    public function newPublisher() {
        return response(Publisher::new(request()->all()));
    }

    public function updatePublisher() {
        return response(Publisher::modify(request()->all()));
    }

    public function getPublisher() {
        return response(Publisher::selectById(request()->only("id")));
    }

    public function getListForSelect() {
        return response(Publisher::getListForSelect());
    }
}
