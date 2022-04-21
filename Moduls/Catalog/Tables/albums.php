<?php

return [
    "tableName"     => "a",
    "query"         => "select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR ', ') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                        ",
    "limit"         => 200,
    "orderable"     => true,
    "orderBy"       => [
        "field"     => "title",
        "index"     => 0,
        "direction" => "Asc"
    ],
    "fields"        => [
        "title"                      => [
            "orderable" => true,
            "header"    => "Cím",
            "width"     => 30
        ],
        "composers"                 => [
            "orderable" => true,
            "header"    => "Szerző(k)",
            "width"     => 30,
        ],
        "name"                 => [
            "orderable" => true,
            "header"    => "Kiadó",
            "width"     => 20,
            "dNone"     => "w1100"
        ],
        "publishDate"                 => [
            "orderable" => true,
            "header"    => "Mgjelenés dátuma",
            "width"     => 20,
            "dNone"     => "w1300",
            "align"     => "Center",
        ],
    ],
];