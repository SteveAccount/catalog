<?php

namespace Catalog\Models;

use SteveEngine\Data\Model;
use SteveEngine\Validate\Field;

class Album extends Model {
    public static $tableName = "albums";

    public int      $id;
    public string   $title;
    public int      $publisherId;
    public string   $publisherDate;
    public int      $createdBy;
    public string   $createdAt;
    public ?int     $modifiedBy;
    public ?string  $modifiedAt;

    public static function new(array $data) : ?Album {
        $composerIds = $data["composerId"];
        db()->beginTransaction();

        if (validate()->fields(self::getFields())->check($data)) {
            $new = new self();
            $new->setFields($data);
            $new->createdBy = request()->user ? request()->user->id : 0;
            $new->id        = $new->insert() ?? 0;

            if (is_array($composerIds) && count($composerIds) > 0) {
                foreach ($composerIds as $composerId) {
                    $data = [
                        "albumId"       => $new->id,
                        "composerId"    => $composerId
                    ];
                    AlbumsComposersRel::new($data);
                }
            } else {
                throw new \Exception(json_encode(["composerId" => "Szerző - Kötelező mező"]), 422);
            }

            db()->endTransaction();
        } else {
            throw new \Exception(json_encode(validate()->getErrors()), 422);
        }

        return $new;
    }

    public static function modify(array $data) : Album {
        $composerIds = $data["composerId"];
        db()->beginTransaction();

        if (validate()->fields(self::getFields())->check($data)) {
            $album = Album::selectById($data["id"]);
            $album->setFields($data);
            $album->modifiedBy = request()->user ? request()->user->id : 0;
            $album->update();

            if (is_array($composerIds) && count($composerIds) > 0) {
                $albumsComposersRels = AlbumsComposersRel::selectByWhere(["albumId" => $album->id]);
                foreach ($albumsComposersRels as $albumsComposersRel) {
                    $albumsComposersRel->fullDelete();
                }

                foreach ($composerIds as $composerId) {
                    $data = [
                        "albumId"       => $album->id,
                        "composerId"    => $composerId
                    ];
                    AlbumsComposersRel::new($data);
                }
            } else {
                throw new \Exception(json_encode(["composerId" => "Szerző - Kötelező mező"]), 422);
            }

            db()->endTransaction();
        } else {
            throw new \Exception(json_encode(validate()->getErrors()), 422);
        }

        return $album;
    }

    public static function getFields() : array {
        return [
            "id"            => Field::number(),
            "title"         => Field::someText()->label("Cím")->required(),
            "publisherId"   => Field::number()->label("Kiadó")->required(),
            "publishDate"   => Field::date()->label("Megjelenés dátuma")->required(),
        ];
    }
}