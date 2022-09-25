CREATE TABLE "public.privilege_of_user" (
	"id" serial NOT NULL,
	"description" varchar(40) NOT NULL,
	"power" int NOT NULL,
	CONSTRAINT "privilege_of_user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.user" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" TEXT NOT NULL,
	"id_previlegio" int NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.training" (
	"id" serial NOT NULL,
	"description" varchar(40) NOT NULL,
	"id_user" int NOT NULL,
	CONSTRAINT "training_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.exercices" (
	"id" serial NOT NULL,
	"descripton" varchar(70) NOT NULL,
	"id_weights" int NOT NULL DEFAULT '0',
	"id_training" int NOT NULL,
	CONSTRAINT "exercices_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.weights" (
	"id" serial NOT NULL,
	"pounds" DECIMAL(20,3) NOT NULL,
	CONSTRAINT "weights_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("id_previlegio") REFERENCES "privilege_of_user"("id");

ALTER TABLE "training" ADD CONSTRAINT "training_fk0" FOREIGN KEY ("id_user") REFERENCES "user"("id");

ALTER TABLE "exercices" ADD CONSTRAINT "exercices_fk0" FOREIGN KEY ("id_weights") REFERENCES "weights"("id");
ALTER TABLE "exercices" ADD CONSTRAINT "exercices_fk1" FOREIGN KEY ("id_training") REFERENCES "training"("id");







