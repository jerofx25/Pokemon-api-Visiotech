# Pokémon Battle API - Backend

API REST para gestionar Pokémons, Movimientos y Batallas Pokémon, implementada con Clean Architecture y TypeScript.

## Tabla de Contenidos

- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Base de Datos](#-base-de-datos)
- [Seeders](#-seeders)
- [Ejecución](#-ejecución)
- [Testing](#-testing)
- [API Endpoints](#-api-endpoints)
- [Tecnologías](#-tecnologías)

## Arquitectura

Este proyecto implementa **Clean Architecture** (Arquitectura Limpia), también conocida como Arquitectura Hexagonal, que separa la lógica de negocio de los detalles de implementación.

### Principios de la Arquitectura

1. **Independencia de Frameworks**: La lógica de negocio no depende de Express, Prisma u otras librerías externas.
2. **Testabilidad**: La lógica de negocio puede ser probada sin dependencias externas.
3. **Independencia de la UI**: La lógica de negocio es independiente de cómo se presenta (REST, GraphQL, CLI, etc.).
4. **Independencia de la Base de Datos**: La lógica de negocio no depende de Prisma o PostgreSQL.
5. **Independencia de Agentes Externos**: La lógica de negocio no conoce nada del mundo exterior.

### Capas de la Arquitectura

```

                    PRESENTATION                       
  (Controllers, Routes, Middlewares, DTOs)                
  - Maneja requests HTTP                                 
  - Valida entrada con DTOs (Zod)                      
  - Orquesta casos de uso                               

                          ↓

                      DOMAIN                            
  (Entities, Use Cases, Repositories, DTOs)           
  - Lógica de negocio pura                               
  - Entidades del dominio                                
  - Casos de uso (reglas de negocio)                     
  - Interfaces de repositorios                           

                          ↓

                  INFRASTRUCTURE                         
  (Datasources, Repository Implementations)               
  - Implementaciones concretas                           
  - Acceso a base de datos (Prisma)                      
  - Integraciones externas                               

```

### Flujo de Datos

```
HTTP Request
    ↓
Presentation Layer (Controller)
    ↓
DTO Validation (Zod)
    ↓
Use Case (Domain)
    ↓
Repository Interface (Domain)
    ↓
Repository Implementation (Infrastructure)
    ↓
Datasource (Infrastructure)
    ↓
Database (PostgreSQL via Prisma)
```

### Ejemplo de Flujo: Crear un Pokémon

1. **Presentation**: `PokemonController.createPokemon()` recibe el request HTTP
2. **DTO**: `CreatePokemonDto.create()` valida y transforma los datos
3. **Use Case**: `CreatePokemon.execute()` contiene la lógica de negocio
4. **Repository**: `PokemonRepository.create()` (interfaz en domain)
5. **Implementation**: `PokemonRepositoryImpl.create()` (implementación en infrastructure)
6. **Datasource**: `PostgresPokemonDatasource.create()` ejecuta la query con Prisma
7. **Database**: PostgreSQL almacena el Pokémon


### Descripción de Capas

#### Domain (Dominio)
- **Responsabilidad**: Contiene la lógica de negocio pura, independiente de frameworks y librerías externas.
- **Componentes**:
  - **Entities**: Objetos de negocio con comportamiento (Pokemon, Move, Battle, BattleTurn)
  - **Use Cases**: Casos de uso que implementan las reglas de negocio
  - **Repository Interfaces**: Contratos que definen cómo acceder a los datos
  - **DTOs**: Objetos de transferencia de datos con validación (Zod)
  - **Datasource Interfaces**: Contratos para acceso a datos

#### Infrastructure (Infraestructura)
- **Responsabilidad**: Implementaciones concretas de las interfaces definidas en el dominio.
- **Componentes**:
  - **Datasources**: Implementaciones concretas usando Prisma
  - **Repository Implementations**: Implementaciones de los repositorios del dominio

#### Presentation (Presentación)
- **Responsabilidad**: Maneja la comunicación HTTP, valida entrada y orquesta casos de uso.
- **Componentes**:
  - **Controllers**: Manejan requests HTTP y respuestas
  - **Routes**: Definen las rutas de la API
  - **Middlewares**: Manejo de errores, async handlers
  - **DTOs**: Validación de entrada con Zod

##  Instalación

### Prerrequisitos

- Node.js 18+
- PostgreSQL 15+ (o Docker)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd pokemon-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz del proyecto:
```env
PORT=3000
PUBLIC_PATH=public
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/pokemon_db
POSTGRES_USER=postgres
POSTGRES_DB=pokemon_db
POSTGRES_PORT=5432
POSTGRES_PASSWORD=postgres
```

4. **Iniciar PostgreSQL**
```bash
# Opción 1: Docker
docker compose up -d

# Opción 2: PostgreSQL local
# Asegúrate de que PostgreSQL esté corriendo en el puerto 5432
```

5. **Ejecutar migraciones**
```bash
npm run prisma:migrate:dev
```

6. **Poblar base de datos con seeders**
```bash
npm run prisma:seed
```

##  Seeders

El proyecto incluye **3 seeders** para poblar la base de datos con datos iniciales:

### Seeder 1: Pokémons Básicos
Crea 5 Pokémons iniciales:
- **Pikachu** (Electric, Lv. 25)
- **Charizard** (Fire, Lv. 30)
- **Blastoise** (Water, Lv. 30)
- **Venusaur** (Grass, Lv. 30)
- **Gengar** (Ghost, Lv. 28)

### Seeder 2: Movimientos
Crea 10 movimientos variados:
- **Thunderbolt** (Electric, Special, 90 power)
- **Flamethrower** (Fire, Special, 90 power)
- **Hydro Pump** (Water, Special, 110 power)
- **Solar Beam** (Grass, Special, 120 power)
- **Shadow Ball** (Ghost, Special, 80 power)
- **Thunder Punch** (Electric, Physical, 75 power)
- **Fire Blast** (Fire, Special, 110 power)
- **Surf** (Water, Special, 90 power)
- **Earthquake** (Ground, Physical, 100 power)
- **Psychic** (Psychic, Special, 90 power)

### Seeder 3: Asignación de Movimientos
Asigna movimientos a los Pokémons:
- **Pikachu**: Thunderbolt, Thunder Punch
- **Charizard**: Flamethrower, Fire Blast, Earthquake
- **Blastoise**: Hydro Pump, Surf
- **Venusaur**: Solar Beam
- **Gengar**: Shadow Ball, Psychic

### Ejecutar Seeders

```bash
npm run prisma:seed
```

### Limpiar y Re-seed

Los seeders limpian automáticamente los datos existentes antes de crear nuevos datos. Para re-ejecutar:

```bash
npm run prisma:seed
```

##  Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

### Con Frontend
```bash
npm run dev:all
```

El servidor estará disponible en `http://localhost:3000`

##  Testing

### Ejecutar Tests
```bash
npm test
```

### Modo Watch
```bash
npm run test:watch
```

### Con Cobertura
```bash
npm run test:coverage
```

### Estructura de Tests

Los tests están organizados siguiendo la misma estructura del código:

```
src/
  domain/
    battle/
      __tests__/
        effectiveness.test.ts
      dto/
        __tests__/
          start-battle.dto.test.ts
      use-case/
        __tests__/
          execute-turn.use-case.test.ts
          start-battle.use-case.test.ts
    pokemon/
      dtos/
        pokemons/
          __tests__/
            create-pokemon.dto.test.ts
    move/
      dtos/
        __tests__/
          create-move.dto.test.ts
```

## API Endpoints

### Pokémons

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/pokemon` | Listar todos los Pokémons |
| `GET` | `/pokemon/:id` | Obtener un Pokémon por ID |
| `POST` | `/pokemon` | Crear un nuevo Pokémon |
| `PUT` | `/pokemon/:id` | Actualizar un Pokémon |
| `DELETE` | `/pokemon/:id` | Eliminar un Pokémon |
| `POST` | `/pokemon/:pokemonId/moves` | Asignar movimientos a un Pokémon |
| `GET` | `/pokemon/:id/moves` | Obtener movimientos de un Pokémon |
| `GET` | `/pokemon/:id/moves/possible` | Obtener movimientos posibles por tipo |
| `DELETE` | `/pokemon/:pokemonId/moves/:moveId` | Remover un movimiento de un Pokémon |

### Movimientos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/move` | Listar todos los movimientos |
| `GET` | `/move/:id` | Obtener un movimiento por ID |
| `POST` | `/move` | Crear un nuevo movimiento |
| `PUT` | `/move/:id` | Actualizar un movimiento |
| `DELETE` | `/move/:id` | Eliminar un movimiento |

### Batallas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/battle/start` | Iniciar una nueva batalla |
| `GET` | `/battle/:id` | Obtener estado de una batalla |
| `POST` | `/battle/:battleId/turn` | Ejecutar un turno de batalla |

### Ejemplos de Uso

#### Crear un Pokémon
```bash
curl -X POST http://localhost:3000/pokemon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pikachu",
    "level": 25,
    "type": "electric",
    "totalHp": 100,
    "attack": 55,
    "defense": 40,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 90
  }'
```

#### Iniciar una Batalla
```bash
curl -X POST http://localhost:3000/battle/start \
  -H "Content-Type: application/json" \
  -d '{
    "pokemonAId": 1,
    "pokemonBId": 2
  }'
```

#### Ejecutar un Turno
```bash
curl -X POST http://localhost:3000/battle/1/turn
```

## Tecnologías

### Core
- **Node.js**: Runtime de JavaScript
- **TypeScript**: Lenguaje de programación tipado
- **Express**: Framework web para Node.js

### Base de Datos
- **PostgreSQL**: Base de datos relacional
- **Prisma**: ORM moderno para TypeScript

### Validación
- **Zod**: Librería de validación de esquemas

### Testing
- **Jest**: Framework de testing
- **ts-jest**: Preset de Jest para TypeScript

### Desarrollo
- **ts-node-dev**: Desarrollo con hot-reload
- **dotenv**: Manejo de variables de entorno
- **env-var**: Validación de variables de entorno

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ejecutar en modo desarrollo |
| `npm run build` | Compilar TypeScript |
| `npm run start` | Ejecutar en producción |
| `npm test` | Ejecutar tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con cobertura |
| `npm run prisma:generate` | Generar Prisma Client |
| `npm run prisma:migrate:dev` | Ejecutar migraciones en desarrollo |
| `npm run prisma:migrate:prod` | Ejecutar migraciones en producción |
| `npm run prisma:seed` | Ejecutar seeders |

## Principios de Diseño Aplicados

### SOLID
- **S**ingle Responsibility: Cada clase tiene una única responsabilidad
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Las implementaciones pueden sustituir interfaces
- **I**nterface Segregation: Interfaces específicas y pequeñas
- **D**ependency Inversion: Dependencias hacia abstracciones, no implementaciones

### Clean Code
- Nombres descriptivos
- Funciones pequeñas y enfocadas
- Comentarios solo cuando es necesario
- Código auto-documentado

### DRY (Don't Repeat Yourself)
- Reutilización de código mediante funciones y clases
- Evitar duplicación de lógica

## Seguridad

- Validación de entrada con Zod
- Manejo de errores centralizado
- Variables de entorno para configuración sensible
- CORS configurado para desarrollo


