<?php

namespace Catalog\Models;

use SteveEngine\Data\Model;
use SteveEngine\Validate\Field;

class Publisher extends Model {
    public static $tableName = "publishers";

    public int      $id;
    public string   $name;
    public int      $isActive;
    public int      $createdBy;
    public string   $createdAt;
    public ?int     $modifiedBy;
    public ?string  $modifiedAt;

    public static function new(array $data) : ?Publisher {
        if (validate()->fields(self::getFields())->check($data)) {
            $new = new self();
            $new->setFields($data);
            $new->isActive = 1;
            $new->createdBy = request()->user ? request()->user->id : 0;
            $new->id        = $new->insert() ?? 0;
        } else {
            throw new \Exception(json_encode(validate()->getErrors()), 422);
        }

        return $new;
    }

    public static function modify(array $data) : Publisher {
        if (validate()->fields(self::getFields())->check($data)) {
            $publisher = Publisher::selectById($data["id"]);
            $publisher->setFields($data);
            $publisher->modifiedBy = request()->user ? request()->user->id : 0;
            $publisher->update();
        } else {
            throw new \Exception(json_encode(validate()->getErrors()), 422);
        }

        return $publisher;
    }

    public static function getFields() : array {
        return [
            "id"        => Field::number(),
            "name"      => Field::someText()->label("Név")->required(),
            "isActive"  => Field::someText(),
        ];
    }
}