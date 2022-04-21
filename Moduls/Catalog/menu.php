<?php

return [
    [
        "name"          => "catalog",
        "parentName"    => 0,
        "orderIndex"    => 0,
        "label"         => "Katalógus",
        "action"        => "/albums",
        "permissions"   => []
    ],
    [
        "name"          => "baseData",
        "parentName"    => 0,
        "orderIndex"    => 1,
        "label"         => "Törzsadatok",
        "action"        => "",
        "permissions"   => []
    ],
    [
        "name"          => "composers",
        "parentName"    => "baseData",
        "orderIndex"    => 0,
        "label"         => "Szerzők",
        "action"        => "/composers",
        "permissions"   => []
    ],
    [
        "name"          => "publishers",
        "parentName"    => "baseData",
        "orderIndex"    => 1,
        "label"         => "Kiadók",
        "action"        => "/publishers",
        "permissions"   => []
    ],
];