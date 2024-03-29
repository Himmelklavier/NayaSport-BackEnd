use naya;
drop table if exists cart;


CREATE TABLE cart (
  idCart INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  idProducto INT NOT NULL,
  fechaIngreso DATETIME DEFAULT CURRENT_TIMESTAMP,
  cantidad INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL);
  /*precio_item DECIMAL(10,2) NOT NULL);*/
  
ALTER TABLE cart
  ADD CONSTRAINT fk_usuario FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT fk_producto FOREIGN KEY (idProducto) REFERENCES producto (idProducto) ON DELETE NO ACTION ON UPDATE NO ACTION;
  
INSERT INTO cart (idProducto, idUsuario, cantidad, precio) VALUES (2521, 1, 1, 394842);

select * from cart;

delete from cart;