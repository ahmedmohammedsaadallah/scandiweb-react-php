<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitea1fd0b97bc91f1e80529995afc1ce35
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Server\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Server\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitea1fd0b97bc91f1e80529995afc1ce35::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitea1fd0b97bc91f1e80529995afc1ce35::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitea1fd0b97bc91f1e80529995afc1ce35::$classMap;

        }, null, ClassLoader::class);
    }
}
