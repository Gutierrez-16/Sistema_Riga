CREATE DATABASE RigaDB
GO

USE RigaDB
GO

CREATE TABLE Departamento(
	IDDepartamento INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreDep varchar (30) NOT NULL,
	EstadoDepartamento char (1)
)
GO

CREATE TABLE Provincia(
	IDProvincia INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreProv varchar (30) NOT NULL,
	IDDepartamento INT,
	EstadoProvincia char (1),
	FOREIGN KEY (IDDepartamento) REFERENCES Departamento (IDDepartamento)
)
GO

CREATE TABLE Distrito(
	IDDistrito INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreDist varchar (30) NOT NULL,
	IDProvincia INT,
	EstadoDistrito char (1),
	FOREIGN KEY (IDProvincia) REFERENCES Provincia (IDProvincia)
)
GO

CREATE TABLE Cargo(
	IDCargo INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreCargo varchar (30) NOT NULL,
	EstadoCargo char (1)
)
GO

CREATE TABLE Persona(
	IDPersona INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	DNI CHAR (8),
	Nombre varchar (30),
	Ape_Pat varchar (30),
	Ape_Mat varchar (30),
	Genero char (1),
	Fecha_Nac date,
	Correo varchar (50),
	Celular char (9),
	Direccion varchar (50),
	IDDistrito INT
	FOREIGN KEY (IDDistrito) REFERENCES Distrito(IDDistrito)
)
GO

CREATE TABLE Empresa(
	IDEmpresa INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	RUC CHAR (13),
	RazonSocial varchar (30),
	Direccion varchar (50),
	EstadoEmpresa char (1),
	IDDistrito INT,
	FOREIGN KEY (IDDistrito) REFERENCES Distrito (IDDistrito)
)
GO

CREATE TABLE Cliente(
	IDCliente INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	EstadoCliente CHAR (1),
	IDPersona INT,
	IDEmpresa INT,
	FOREIGN KEY (IDPersona) REFERENCES Persona(IDPersona)
)
GO

CREATE TABLE Empleado(
	IDEmpleado INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	Sueldo decimal(10,2),
	FechaIng date,
	NHijos int,
	HoraEntrada date,
	HoraSalida date,
	Turno varchar (30),
	EstadoEmpleado char (1),
	IDCargo INT,
	IDPersona INT,
	FOREIGN KEY (IDCargo) REFERENCES Cargo (IDCargo),
	FOREIGN KEY (IDPersona) REFERENCES Persona (IDPersona)
)
GO

CREATE TABLE TipoUsuario(
	IDTipoUsuario INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NomTipo varchar (15),
	EstadoTipoUsuario char (1)
)
GO

CREATE TABLE Usuario(
	IDUsuario INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	Logeo varchar (15),
	Clave varchar (15),
	EstadoUsuario char (1),
	IDEmpleado INT,
	IDTipoUsuario INT,
	FOREIGN KEY (IDEmpleado) REFERENCES Empleado (IDEmpleado),
	FOREIGN KEY (IDTipoUsuario) REFERENCES TipoUsuario (IDTipoUsuario)
)
GO

CREATE TABLE Pedido(
	IDPedido INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	FechaPedido date,
	EstadoPedido char (1)
)
GO

CREATE TABLE Categoria(
	IDCategoria INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreCategoria VARCHAR (30),
	EstadoCategoria char(1)
)
GO

CREATE TABLE Linea (
	IDLinea INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreLinea varchar (30),
	EstadoLinea char(1)
)
GO

CREATE TABLE UnidadMedida (
	IDUnidadMedida INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreUnidadMedida varchar (30),
	EstadoUnidadMedida char(1)
)
GO

CREATE TABLE Producto(
	IDProducto INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreProd VARCHAR (30),
	PrecioUnit decimal (10,2),
	Marca varchar (15),
	Imagen image,
	Descripcion varchar (30),
	EstadoCategoriaProd char (1),
	IDCategoria INT,
	IDUnidadMedida INT,
	IDLinea INT,
	FOREIGN KEY (IDCategoria) REFERENCES Categoria (IDCategoria),
	FOREIGN KEY (IDUnidadMedida) REFERENCES UnidadMedida (IDUnidadMedida),
	FOREIGN KEY (IDLinea) REFERENCES Linea (IDLinea)

)
GO

CREATE TABLE DetallePedido(
	IDDetallePedido INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	Cant INT,
	Precio DECIMAL(10,2),
	EstadoPedido char (1),
	IDProducto INT,
	IDPedido INT,
	IDUsuario INT,
	FOREIGN KEY (IDProducto) REFERENCES Producto(IDProducto),
	FOREIGN KEY (IDPedido) REFERENCES Pedido (IDPedido),
	FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario)
)
GO

CREATE TABLE MetodoPago(
	IDMetodoPago INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	NombreMetodo varchar (30),
	EstadoMetodo char (1)
)
GO

CREATE TABLE Venta(
	IDVenta INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	Subtotal decimal (10,2),
	FechaVenta date,
	Descuento decimal (10,2),
	IGV decimal (10,2),
	Total decimal (10,2),
	TotalDescuento decimal (10,2),
	TotalPagar decimal (10,2),
	TipoComprobante char (1),
	EstadoVenta char (1),
	IDCliente INT,
	IDPedido INT,
	IDUsuario INT,
	IDMetodoPago INT,
	FOREIGN KEY (IDCliente) REFERENCES Cliente (IDCliente),
	FOREIGN KEY (IDPedido) REFERENCES Pedido (IDPedido),
	FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario),
	FOREIGN KEY (IDMetodoPago) REFERENCES MetodoPago (IDMetodoPago),

)
GO

CREATE TABLE Boleta(
	IDBoleta INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	Serie char (10),
	Numero char (10),
	EstadoBoleta char (1),
	IDVenta INT
	FOREIGN KEY (IDVenta) REFERENCES Venta (IDVenta)
)
GO

CREATE TABLE Factura(
	IDFactura INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	Serie char (10),
	Numero char (10),
	EstadoFactura char (1),
	IDVenta INT
	FOREIGN KEY (IDVenta) REFERENCES Venta (IDVenta)
)
GO

CREATE TABLE Caja(
	IDCaja INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	FechaApertura date,
	FechaCierre date,
	MontoInicial decimal (10,2),
	MontoFinal decimal (10,2),
	IDUsuario INT
	FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario)
)
GO

CREATE TABLE DetalleCaja(
	IDDetalleCaja INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
	Monto decimal (10,2),
	IDCaja INT
	FOREIGN KEY (IDCaja) REFERENCES Caja (IDCaja)
)
GO