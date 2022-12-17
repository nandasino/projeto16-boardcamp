import { db } from '../db.js';
import dayjs from "dayjs";

export async function postRent(req,res){
    const { customerId, gameId, daysRented } = res.locals.rent;
    const gameToRent = res.locals.game;
    try{
        await db.query(`
            INSERT INTO rentals 
            ("customerId", "gameId", "rentDate", "daysRented",
            "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [
              customerId,
              gameId,
              dayjs().format("YYYY-MM-DD"),
              daysRented,
              null,
              gameToRent.pricePerDay * daysRented,
              null,
            ]
          );
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function getRentals(req,res){
  const {customerId,gameId} = req.query;
  try{

    if(customerId){
      const rentalsByCustomer = await db.query(`
      SELECT 
      rentals.id, rentals."customerId" , rentals."gameId",
      TO_CHAR(rentals."rentDate",'yyyy-mm-dd') AS "rentDate", rentals."daysRented", 
      TO_CHAR(rentals."returnDate",'yyyy-mm-dd') AS "returnDate", rentals."originalPrice", rentals."delayFee",
      json_build_object(
      'id', customers.id,
      'name', customers.name) 
      AS customer,
      json_build_object(
      'id', games.id,
      'name', games.name, 
      'categoryId', games."categoryId",
      'categoryName', categories.name)
      AS game
      FROM customers
      JOIN rentals ON customers.id = rentals."customerId"
      JOIN games ON games.id = rentals."gameId"
      JOIN categories ON games."categoryId" = categories.id
      WHERE rentals."customerId" = $1;`,
      [`${customerId}`]);
    return res.send(rentalsByCustomer.rows);
    }

    if(gameId){
      const rentalsByGame = await db.query(`
      SELECT 
      rentals.id, rentals."customerId" , rentals."gameId",
      TO_CHAR(rentals."rentDate",'yyyy-mm-dd') AS "rentDate", rentals."daysRented", 
      TO_CHAR(rentals."returnDate",'yyyy-mm-dd') AS "returnDate", rentals."originalPrice", rentals."delayFee",
      json_build_object(
      'id', customers.id,
      'name', customers.name) 
      AS customer,
      json_build_object(
      'id', games.id,
      'name', games.name, 
      'categoryId', games."categoryId",
      'categoryName', categories.name)
      AS game
      FROM customers
      JOIN rentals ON customers.id = rentals."customerId"
      JOIN games ON games.id = rentals."gameId"
      JOIN categories ON games."categoryId" = categories.id
      WHERE rentals."gameId" = $1;`,
      [`${gameId}`]);
    return res.send(rentalsByGame.rows);
    }
    const rentals = await db.query(`
      SELECT 
      rentals.id, rentals."customerId" , rentals."gameId",
      TO_CHAR(rentals."rentDate",'yyyy-mm-dd') AS "rentDate", rentals."daysRented", 
      TO_CHAR(rentals."returnDate",'yyyy-mm-dd') AS "returnDate", rentals."originalPrice", rentals."delayFee",
      json_build_object(
      'id', customers.id,
      'name', customers.name) 
      AS customer,
      json_build_object(
      'id', games.id,
      'name', games.name, 
      'categoryId', games."categoryId",
      'categoryName', categories.name)
      AS game
      FROM customers
      JOIN rentals ON customers.id = rentals."customerId"
      JOIN games ON games.id = rentals."gameId"
      JOIN categories ON games."categoryId" = categories.id; 
    `)
    res.send(rentals.rows);
  }catch(error){
    res.sendStatus(500);
  }
}

export async function closeRentals(req,res){
  const {id} = req.params;
  try{
    const rentExists = await db.query(`SELECT * FROM rentals WHERE id = $1;`,[id]);
  
    if(rentExists.rowCount == 0){
      return res.sendStatus(404);
    }
    const rentSearched = rentExists.rows[0];
    const returnDate = rentSearched.returnDate;
    const rentDate = rentSearched.rentDate;

    if(returnDate != null){
      return res.sendStatus(400);
    }

    const differenceOfDays = dayjs().diff(rentDate, "day");
    const daysRented = rentSearched.daysRented;
    const originalPrice = rentSearched.originalPrice;
    const pricePerDay = originalPrice/daysRented;
    let delayFee = 0;

    if(differenceOfDays > daysRented){
      delayFee = differenceOfDays * pricePerDay;
    }
    await db.query(`
    UPDATE rentals 
    SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
    [dayjs().format("YYYY-MM-DD"), delayFee, id]);

    res.sendStatus(201);

  }catch(error){
    res.sendStatus(500);
  }
}