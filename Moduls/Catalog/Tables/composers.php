<?php

return [
    "tableName"     => "s",
    "query"         => "select id, name
                        from composers
                        ",
    "limit"         => 200,
    "orderable"     => true,
    "orderBy"       => [
        "field"     => "name",
        "index"     => 0,
        "direction" => "Asc"
    ],
    "fields"        => [
        "name"                      => [
            "orderable" => true,
            "header"    => "Név",
            "width"     => 30
        ],
    ],
];