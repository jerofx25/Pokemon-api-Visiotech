import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeders...');

  // Limpiar datos existentes
  console.log('🧹 Limpiando datos existentes...');
  await prisma.battleTurn.deleteMany();
  await prisma.battle.deleteMany();
  await prisma.pokemonMove.deleteMany();
  await prisma.move.deleteMany();
  await prisma.pokemon.deleteMany();

  // Seeder 1: Pokémons básicos
  console.log('📦 Creando Pokémons...');
  const pikachu = await prisma.pokemon.create({
    data: {
      name: 'Pikachu',
      level: 25,
      type: 'electric',
      currentHp: 100,
      totalHp: 100,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
  });

  const charizard = await prisma.pokemon.create({
    data: {
      name: 'Charizard',
      level: 30,
      type: 'fire',
      currentHp: 120,
      totalHp: 120,
      attack: 84,
      defense: 78,
      specialAttack: 85,
      specialDefense: 85,
      speed: 100,
    },
  });

  const blastoise = await prisma.pokemon.create({
    data: {
      name: 'Blastoise',
      level: 30,
      type: 'water',
      currentHp: 150,
      totalHp: 150,
      attack: 83,
      defense: 100,
      specialAttack: 85,
      specialDefense: 105,
      speed: 78,
    },
  });

  const venusaur = await prisma.pokemon.create({
    data: {
      name: 'Venusaur',
      level: 30,
      type: 'grass',
      currentHp: 140,
      totalHp: 140,
      attack: 82,
      defense: 83,
      specialAttack: 100,
      specialDefense: 100,
      speed: 80,
    },
  });

  const gengar = await prisma.pokemon.create({
    data: {
      name: 'Gengar',
      level: 28,
      type: 'ghost',
      currentHp: 110,
      totalHp: 110,
      attack: 65,
      defense: 60,
      specialAttack: 130,
      specialDefense: 75,
      speed: 110,
    },
  });

  console.log(`✅ Creados ${await prisma.pokemon.count()} Pokémons`);

  // Seeder 2: Movimientos
  console.log('⚔️ Creando Movimientos...');
  const thunderbolt = await prisma.move.create({
    data: {
      name: 'Thunderbolt',
      type: 'electric',
      category: 'special',
      power: 90,
      accuracy: 100,
      pp: 15,
      effect: 'May paralyze opponent',
      probability: 10,
    },
  });

  const flamethrower = await prisma.move.create({
    data: {
      name: 'Flamethrower',
      type: 'fire',
      category: 'special',
      power: 90,
      accuracy: 100,
      pp: 15,
      effect: 'May burn opponent',
      probability: 10,
    },
  });

  const hydroPump = await prisma.move.create({
    data: {
      name: 'Hydro Pump',
      type: 'water',
      category: 'special',
      power: 110,
      accuracy: 80,
      pp: 5,
      effect: 'High damage water attack',
      probability: null,
    },
  });

  const solarBeam = await prisma.move.create({
    data: {
      name: 'Solar Beam',
      type: 'grass',
      category: 'special',
      power: 120,
      accuracy: 100,
      pp: 10,
      effect: 'Charges for one turn',
      probability: null,
    },
  });

  const shadowBall = await prisma.move.create({
    data: {
      name: 'Shadow Ball',
      type: 'ghost',
      category: 'special',
      power: 80,
      accuracy: 100,
      pp: 15,
      effect: 'May lower opponent\'s Special Defense',
      probability: 20,
    },
  });

  const thunderPunch = await prisma.move.create({
    data: {
      name: 'Thunder Punch',
      type: 'electric',
      category: 'physical',
      power: 75,
      accuracy: 100,
      pp: 15,
      effect: 'May paralyze opponent',
      probability: 10,
    },
  });

  const fireBlast = await prisma.move.create({
    data: {
      name: 'Fire Blast',
      type: 'fire',
      category: 'special',
      power: 110,
      accuracy: 85,
      pp: 5,
      effect: 'May burn opponent',
      probability: 10,
    },
  });

  const surf = await prisma.move.create({
    data: {
      name: 'Surf',
      type: 'water',
      category: 'special',
      power: 90,
      accuracy: 100,
      pp: 15,
      effect: 'Hits all adjacent Pokémon',
      probability: null,
    },
  });

  const earthquake = await prisma.move.create({
    data: {
      name: 'Earthquake',
      type: 'ground',
      category: 'physical',
      power: 100,
      accuracy: 100,
      pp: 10,
      effect: 'Hits all adjacent Pokémon',
      probability: null,
    },
  });

  const psychic = await prisma.move.create({
    data: {
      name: 'Psychic',
      type: 'psychic',
      category: 'special',
      power: 90,
      accuracy: 100,
      pp: 10,
      effect: 'May lower opponent\'s Special Defense',
      probability: 10,
    },
  });

  console.log(`✅ Creados ${await prisma.move.count()} Movimientos`);

  // Seeder 3: Asignar movimientos a Pokémons
  console.log('🔗 Asignando movimientos a Pokémons...');
  
  // Pikachu: Thunderbolt, Thunder Punch
  await prisma.pokemonMove.createMany({
    data: [
      { pokemonId: pikachu.id, moveId: thunderbolt.id, pp: 15 },
      { pokemonId: pikachu.id, moveId: thunderPunch.id, pp: 15 },
    ],
  });

  // Charizard: Flamethrower, Fire Blast, Earthquake
  await prisma.pokemonMove.createMany({
    data: [
      { pokemonId: charizard.id, moveId: flamethrower.id, pp: 15 },
      { pokemonId: charizard.id, moveId: fireBlast.id, pp: 5 },
      { pokemonId: charizard.id, moveId: earthquake.id, pp: 10 },
    ],
  });

  // Blastoise: Hydro Pump, Surf
  await prisma.pokemonMove.createMany({
    data: [
      { pokemonId: blastoise.id, moveId: hydroPump.id, pp: 5 },
      { pokemonId: blastoise.id, moveId: surf.id, pp: 15 },
    ],
  });

  // Venusaur: Solar Beam
  await prisma.pokemonMove.create({
    data: {
      pokemonId: venusaur.id,
      moveId: solarBeam.id,
      pp: 10,
    },
  });

  // Gengar: Shadow Ball, Psychic
  await prisma.pokemonMove.createMany({
    data: [
      { pokemonId: gengar.id, moveId: shadowBall.id, pp: 15 },
      { pokemonId: gengar.id, moveId: psychic.id, pp: 10 },
    ],
  });

  console.log(`✅ Asignados movimientos a Pokémons`);

  console.log('✨ Seeders completados exitosamente!');
  console.log('\n📊 Resumen:');
  console.log(`   - Pokémons: ${await prisma.pokemon.count()}`);
  console.log(`   - Movimientos: ${await prisma.move.count()}`);
  console.log(`   - Asignaciones: ${await prisma.pokemonMove.count()}`);
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seeders:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

