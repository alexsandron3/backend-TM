-- CreateTable
CREATE TABLE `cliente` (
    `idCliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCliente` VARCHAR(100) NULL,
    `emailCliente` VARCHAR(100) NULL,
    `rgCliente` VARCHAR(15) NULL,
    `orgaoEmissor` VARCHAR(20) NULL,
    `cpfCliente` VARCHAR(20) NULL,
    `telefoneCliente` VARCHAR(20) NULL,
    `dataNascimento` DATE NULL,
    `idadeCliente` INTEGER NULL,
    `referencia` VARCHAR(100) NULL,
    `pessoaContato` VARCHAR(100) NULL,
    `telefoneContato` VARCHAR(20) NULL,
    `cpfConsultado` BOOLEAN NULL DEFAULT false,
    `dataCpfConsultado` DATE NULL,
    `redeSocial` VARCHAR(200) NULL,
    `created` DATE NULL,
    `modified` DATETIME(0) NULL,
    `statusCliente` BOOLEAN NULL DEFAULT true,
    `enderecoCliente` VARCHAR(200) NULL,
    `nacionalidade` VARCHAR(70) NULL,
    `profissao` VARCHAR(70) NULL,
    `estadoCivil` VARCHAR(70) NULL,
    `clienteRedeSocial` BOOLEAN NOT NULL DEFAULT false,
    `poltrona` VARCHAR(100) NULL,
    `statusCpf` VARCHAR(50) NULL DEFAULT 'Não verificado',

    PRIMARY KEY (`idCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `despesa` (
    `idDespesa` INTEGER NOT NULL AUTO_INCREMENT,
    `idPasseio` INTEGER NOT NULL,
    `valorIngresso` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorOnibus` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorMicro` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorVan` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorEscuna` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorAlmocoCliente` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorAlmocoMotorista` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorEstacionamento` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorGuia` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorAutorizacaoTransporte` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorTaxi` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorKitLanche` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorMarketing` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorImpulsionamento` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorPulseira` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `valorHospedagem` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `valorAereo` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `valorServicos` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `valorSeguroViagem` DECIMAL(9, 2) NOT NULL DEFAULT 0.00,
    `outros` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `quantidadeIngresso` INTEGER NULL DEFAULT 1,
    `quantidadeOnibus` INTEGER NULL DEFAULT 1,
    `quantidadeMicro` INTEGER NULL DEFAULT 1,
    `quantidadeEscuna` INTEGER NULL DEFAULT 1,
    `quantidadeAlmocoCliente` INTEGER NULL DEFAULT 1,
    `quantidadeAlmocoMotorista` INTEGER NULL DEFAULT 1,
    `quantidadeEstacionamento` INTEGER NULL DEFAULT 1,
    `quantidadeGuia` INTEGER NULL DEFAULT 1,
    `quantidadeAutorizacaoTransporte` INTEGER NULL DEFAULT 1,
    `quantidadeTaxi` INTEGER NULL DEFAULT 1,
    `quantidadeMarketing` INTEGER NULL DEFAULT 1,
    `quantidadeKitLanche` INTEGER NULL DEFAULT 1,
    `quantidadeImpulsionamento` INTEGER NULL DEFAULT 1,
    `quantidadePulseira` INTEGER NOT NULL DEFAULT 1,
    `quantidadeHospedagem` INTEGER NOT NULL DEFAULT 1,
    `quantidadeAereo` INTEGER NOT NULL DEFAULT 1,
    `quantidadeServicos` INTEGER NOT NULL DEFAULT 1,
    `quantidadeVan` INTEGER NULL DEFAULT 1,
    `quantidadeSeguroViagem` INTEGER NOT NULL DEFAULT 1,
    `totalDespesas` DECIMAL(9, 2) NOT NULL,

    INDEX `idPasseio`(`idPasseio`),
    PRIMARY KEY (`idDespesa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `idLog` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `nomecliente` VARCHAR(100) NULL,
    `nomePasseio` VARCHAR(100) NULL,
    `dataPasseio` DATE NULL,
    `valorPago` DECIMAL(9, 2) NULL,
    `dataLog` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `tipoModificacao` VARCHAR(50) NOT NULL,

    INDEX `idUser`(`idUser`),
    PRIMARY KEY (`idLog`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamento_passeio` (
    `idPagamento` INTEGER NOT NULL AUTO_INCREMENT,
    `idCliente` INTEGER NOT NULL,
    `idPasseio` INTEGER NOT NULL,
    `createdBy` INTEGER NOT NULL DEFAULT 3,
    `valorPago` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `valorVendido` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `previsaoPagamento` DATE NULL,
    `valorPendente` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `statusPagamento` INTEGER NOT NULL,
    `seguroViagem` BOOLEAN NULL,
    `clienteParceiro` BOOLEAN NOT NULL DEFAULT false,
    `transporte` VARCHAR(50) NULL,
    `anotacoes` VARCHAR(500) NULL,
    `historicoPagamento` VARCHAR(500) NULL,
    `valorSeguroViagemCliente` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `taxaPagamento` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `localEmbarque` VARCHAR(100) NULL,
    `dataPagamento` DATE NULL,
    `clienteDesistente` BOOLEAN NOT NULL DEFAULT false,
    `ordemPoltrona` INTEGER NULL,
    `lastModified` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `valorContrato` FLOAT NOT NULL,
    `numeroVagas` INTEGER NOT NULL,
    `opcionais` TEXT NOT NULL,
    `dataPagamentoEfetuado` TIMESTAMP(0) NULL,

    INDEX `createdBy`(`createdBy`),
    INDEX `idCliente`(`idCliente`),
    INDEX `idPasseio`(`idPasseio`),
    PRIMARY KEY (`idPagamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passeio` (
    `idPasseio` INTEGER NOT NULL AUTO_INCREMENT,
    `nomePasseio` VARCHAR(100) NULL,
    `localPasseio` VARCHAR(50) NULL,
    `valorPasseio` DECIMAL(9, 2) NULL DEFAULT 0.00,
    `dataPasseio` DATE NULL,
    `lotacao` INTEGER NULL DEFAULT 0,
    `anotacoes` VARCHAR(200) NULL,
    `idadeIsencao` INTEGER NOT NULL,
    `statusPasseio` BOOLEAN NULL DEFAULT true,
    `dataLancamento` DATE NOT NULL,
    `itensPacote` TEXT NOT NULL,
    `prazoVigencia` DATE NOT NULL,

    PRIMARY KEY (`idPasseio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nivelAcesso` INTEGER NOT NULL DEFAULT 2,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `despesa` ADD CONSTRAINT `despesa_ibfk_1` FOREIGN KEY (`idPasseio`) REFERENCES `passeio`(`idPasseio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagamento_passeio` ADD CONSTRAINT `pagamento_passeio_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente`(`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagamento_passeio` ADD CONSTRAINT `pagamento_passeio_ibfk_2` FOREIGN KEY (`idPasseio`) REFERENCES `passeio`(`idPasseio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagamento_passeio` ADD CONSTRAINT `createdBy` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
