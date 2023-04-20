<?php
namespace Server\Classes;
use Server\Classes\DVD;
use Server\Classes\Furniture;
use Server\Classes\Book;
use Server\Classes\Product;
class ProductFactory
{
    public static function create($className, $sku, $name, $price, $typeSpecificInformation, $productType) : mixed
    {
        $class = new \ReflectionClass(ucfirst("Server\Classes\\" . $className));
        $product = $class->newInstanceArgs(array($sku, $name, $price, $typeSpecificInformation, $productType));
        return $product;
    }
}
