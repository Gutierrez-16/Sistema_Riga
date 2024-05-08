USE [DBSistemaVentas]
GO

/****** Object:  Table [dbo].[Cliente]    Script Date: 4/17/2024 9:41:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Cliente](
	[IDCliente] [int] IDENTITY(1,1) NOT NULL,
	[EstadoCliente] [char](1) NULL,
	[IDPersona] [int] NULL,
	[IDEmpresa] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IDCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD FOREIGN KEY([IDEmpresa])
REFERENCES [dbo].[Empresa] ([IDEmpresa])
GO

ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD FOREIGN KEY([IDPersona])
REFERENCES [dbo].[Persona] ([IDPersona])
GO

SELECT * FROM Persona

SELECT * FROM Empresa
GO

SELECT * FROM Cliente

INSERT INTO Empresa VALUES ('445454', 'DWDFSDF', 'LOS CANCHITOS', '1', 1)

EXEC SP_InsertarCliente '1',1,NULL