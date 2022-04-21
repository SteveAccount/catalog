<?php

namespace Catalog;

use Catalog\Models\Album;
use Catalog\Models\AlbumsComposersRel;
use SteveEngine\ControllerForModulSystem;

class AlbumController extends ControllerForModulSystem {
    public string $path = __DIR__;

    public function getAlbumsPage() {
        return $this->twig->render("albums.html.twig", [
            "tableInfo"     => include("Tables/albums.php")
        ]);
    }

    public function getList() {
        return response($this->getData("albums"));
    }

    public function newAlbum() {
        return response(Album::new(request()->all()));
    }

    public function updateAlbum() {
        return response(Album::modify(request()->all()));
    }

    public function getAlbum() {
        $album = Album::selectById(request()->only("id"));
        $album->composers = AlbumsComposersRel::selectByWhere(["albumId" => $album->id]);

        return response($album);
    }
}
