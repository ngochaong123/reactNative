Create database ThongTin;
use ThongTin;
create table sinhvien(
	ID int not null AUTO_INCREMENT PRIMARY KEY,
    Name varchar(20),
    Diem int,
    Khoa int
);

INSERT INTO sinhvien (Name, Diem, Khoa) VALUES ('Nguyen Van A', 85, 101);
INSERT INTO sinhvien (Name, Diem, Khoa) VALUES ('Tran Thi B', 90, 102);
INSERT INTO sinhvien (Name, Diem, Khoa) VALUES ('Le Van C', 75, 103);
