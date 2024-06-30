-- CreateTable
CREATE TABLE "RestaurantManager" (
    "manager_id" SERIAL NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "RestaurantManager_pkey" PRIMARY KEY ("manager_id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branch_id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "branch_name" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "branch_address" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "restaurant_id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "restaurant_name" TEXT NOT NULL,
    "cuisine_type" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateTable
CREATE TABLE "RestaurantOwner" (
    "owner_id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "commercial_id" TEXT NOT NULL,

    CONSTRAINT "RestaurantOwner_pkey" PRIMARY KEY ("owner_id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "wishlist_id" SERIAL NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("wishlist_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "description" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "driver_id" INTEGER,
    "review_id" INTEGER,
    "size" TEXT NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,
    "order_status" TEXT NOT NULL,
    "products" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "order_time" TIMESTAMP(3) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrderProduct" (
    "op_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_each" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("op_id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "driver_id" SERIAL NOT NULL,
    "driver_name" TEXT NOT NULL,
    "car_license" TEXT NOT NULL,
    "driver_license" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,
    "storage_size" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("driver_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "order_id" INTEGER,
    "employee_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "commercial_id" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,
    "minimum_order_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantManager_email_key" ON "RestaurantManager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantOwner_email_key" ON "RestaurantOwner"("email");

-- CreateIndex
CREATE INDEX "branch_id_index" ON "Order"("branch_id");

-- CreateIndex
CREATE INDEX "order_id_index" ON "OrderProduct"("order_id");

-- CreateIndex
CREATE INDEX "employee_id_index" ON "Review"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "RestaurantManager" ADD CONSTRAINT "RestaurantManager_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "RestaurantOwner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("driver_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
