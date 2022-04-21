<?php

namespace Catalog\Models;

use SteveEngine\Data\Model;
use SteveEngine\Validate\Field;

class AlbumsComposersRel extends Model {
    public static $tableName = "albums_composers_rel";

    public int      $id;
    public int      $albumId;
    public int      $composerId;

    public static function new(array $data) {
        if (validate()->fields(self::getFields())->check($data)) {
            $new = new self();
            $new->setFields($data);
            $new->id        = $new->insert() ?? 0;
        } else {
            throw new \Exception(json_encode(validate()->getErrors()), 422);
        }
    }

    public static function modify(array $data) : Composer {
        if (validate()->fields(self::getFields())->check($data)) {
            $composer = Composer::selectById($data["id"]);
            $composer->setFields($data);
            $composer->modifiedBy = request()->user ? request()->user->id : 0;
            $composer->update();
        } else {
            throw new \Exception(json_encode(validate()->getErrors()), 422);
        }

        return $composer;
    }

    public static function getFields() : array {
        return [
            "id"            => Field::number(),
            "albumId"       => Field::number(),
            "composerId"    => Field::number(),
        ];
    }
}