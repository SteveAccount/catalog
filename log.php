

2022-04-21 10:02:18
'insert ignore into session (sessionId, ip, userId, expirationDate) values (:sessionId, :ip, :userId, :expirationDate)'

2022-04-21 10:02:18
'select a.id, a.title, ct.composers, p.name, date(a.publishDate) as publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:02:45
'insert ignore into albums (title, publisherId, createdBy, publishDate, isActive) values (:title, :publisherId, :createdBy, :publishDate, :isActive)'

2022-04-21 10:02:45
'SQLSTATE[42S22]: Column not found: 1054 Unknown column \'isActive\' in \'field list\''

2022-04-21 10:02:45
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:02:45
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:02:45
'select a.id, a.title, ct.composers, p.name, date(a.publishDate) as publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:03:53
'insert ignore into albums (title, publisherId, createdBy, publishDate, isActive) values (:title, :publisherId, :createdBy, :publishDate, :isActive)'

2022-04-21 10:03:53
'SQLSTATE[42S22]: Column not found: 1054 Unknown column \'isActive\' in \'field list\''

2022-04-21 10:03:53
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:03:53
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:03:53
'select a.id, a.title, ct.composers, p.name, date(a.publishDate) as publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:05:02
'select a.id, a.title, ct.composers, p.name, date(a.publishDate) as publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:05:16
'insert ignore into albums (title, publisherId, createdBy, publishDate) values (:title, :publisherId, :createdBy, :publishDate)'

2022-04-21 10:05:16
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:05:16
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:05:16
'select a.id, a.title, ct.composers, p.name, date(a.publishDate) as publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:07:52
'select a.id, a.title, ct.composers, p.name, date(a.publishDate) as publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:09:12
'select a.id, a.title, ct.composers, p.name, date(a.publishDate) as publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:10:27
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:14:44
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:18:04
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:20:13
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:20:31
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:22:12
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:23:05
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:23:39
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:45:17
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:45:53
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:48:06
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:48:54
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:49:23
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:50:14
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:50:26
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:51:02
'update albums set title=\'Album56\', publisherId=2, createdBy=1, createdAt=\'2022-04-20 12:26:21\', modifiedBy=0, modifiedAt=\'2022-04-20 12:26:21\', publishDate=\'2018-01-01\' where id=5'

2022-04-21 10:51:02
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:55:44
'update albums set title=\'Album56\', publisherId=2, createdBy=1, createdAt=\'2022-04-20 12:26:21\', modifiedBy=0, modifiedAt=\'2022-04-20 12:26:21\', publishDate=\'2018-01-01\' where id=5'

2022-04-21 10:56:16
'update albums set title=\'Album56\', publisherId=2, createdBy=1, createdAt=\'2022-04-20 12:26:21\', modifiedBy=0, modifiedAt=\'2022-04-20 12:26:21\', publishDate=\'2018-01-01\' where id=5'

2022-04-21 10:56:16
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:56:16
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:56:16
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:56:29
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 10:57:27
'update albums set title=\'Album56\', publisherId=2, createdBy=1, createdAt=\'2022-04-20 12:26:21\', modifiedBy=0, modifiedAt=\'2022-04-20 12:26:21\', publishDate=\'2018-01-01\' where id=5'

2022-04-21 10:57:27
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:57:27
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 10:57:27
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 11:01:08
'update albums set title=\'Album56\', publisherId=2, createdBy=1, createdAt=\'2022-04-20 12:26:21\', modifiedBy=0, modifiedAt=\'2022-04-20 12:26:21\', publishDate=\'2018-01-01\' where id=5'

2022-04-21 11:01:08
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 11:01:08
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 11:01:08
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 11:01:47
'insert ignore into session (sessionId, ip, userId, expirationDate) values (:sessionId, :ip, :userId, :expirationDate)'

2022-04-21 11:01:48
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 11:15:47
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 11:15:53
'select id, name
                        from composers
                          order by name asc limit 0, 200'

2022-04-21 11:15:57
'select id, name
                        from publishers
                          order by name asc limit 0, 200'

2022-04-21 11:16:06
'insert ignore into publishers (name, isActive, createdBy) values (:name, :isActive, :createdBy)'

2022-04-21 11:16:06
'select id, name
                        from publishers
                          order by name asc limit 0, 200'

2022-04-21 11:16:14
'update publishers set name=\'h21\', isActive=1, createdBy=0, createdAt=\'2022-04-21 11:16:06\', modifiedBy=0, modifiedAt=\'2022-04-21 11:16:06\' where id=8'

2022-04-21 11:16:14
'select id, name
                        from publishers
                          order by name asc limit 0, 200'

2022-04-21 11:16:28
'insert ignore into composers (name, isActive, createdBy) values (:name, :isActive, :createdBy)'

2022-04-21 11:16:28
'select id, name
                        from composers
                          order by name asc limit 0, 200'

2022-04-21 11:16:44
'update composers set name=\'Szerző 44\', isActive=1, createdBy=1, createdAt=\'2022-04-20 12:25:54\', modifiedBy=0, modifiedAt=\'2022-04-20 12:25:54\' where id=4'

2022-04-21 11:16:44
'select id, name
                        from composers
                          order by name asc limit 0, 200'

2022-04-21 11:17:01
'update albums set title=\'Album23\', publisherId=2, createdBy=1, createdAt=\'2022-04-20 12:26:21\', modifiedBy=0, modifiedAt=\'2022-04-20 12:26:21\', publishDate=\'2018-01-01\' where id=2'

2022-04-21 11:17:01
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 11:17:01
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 11:17:01
'insert ignore into albums_composers_rel (albumId, composerId) values (:albumId, :composerId)'

2022-04-21 11:17:01
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 11:20:33
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                         where a.title = \'Album4\' order by title asc limit 0, 200'

2022-04-21 11:20:39
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'

2022-04-21 11:20:44
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                         where a.name = \'Kiadó 2\' order by title asc limit 0, 200'

2022-04-21 11:20:44
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                         where a.name = \'Kiadó 2\' order by title asc limit 0, 200'

2022-04-21 11:20:44
array (
  1054 => 'Unknown column \'a.name\' in \'where clause\'',
)

2022-04-21 11:20:48
'select a.id, a.title, ct.composers, p.name, a.publishDate
                        from albums as a
                        left join (
                            SELECT albumId, GROUP_CONCAT(c.name SEPARATOR \', \') as composers
                            FROM albums_composers_rel as acr
                            left join composers as c on c.id = acr.composerId
                            GROUP BY albumId
                        ) as ct on a.id = ct.albumId
                        left join publishers as p on p.id = a.publisherId
                          order by title asc limit 0, 200'