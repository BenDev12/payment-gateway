const express = require("express");
const coinbase = require("coinbase-commerce-node");
const { api } = require("../config/index");
const Client = coinbase.Client;
Client.init("API");
const Checkout = coinbase.resources.Checkout;

// CREATE A CHECKOUT

exports.createCheckout = async (req, res, next) => {
  const { name, description, pricing_type, requested_info } = req.body;
  try {
    const newChekout = await Checkout.create({
      name: name,
      description: description,
      pricing_type: pricing_type,
      requested_info: requested_info
    });
    return res.status(200).json({ newChekout });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LIST ALL CHECKOUTS

exports.listCheckouts = async (req, res, next) => {
  try {
    const list = await Checkout.list({ order: "asc", limit: 4 });
    return res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// SHOW A SINGLE CHECKOUT

exports.showAcheckout = async (req, res, next) => {
  const { checkout_id } = req.params;
  if (!checkout_id) return res.status(404).json({ message: "Invalid URL" });
  try {
    const checkout = await Checkout.retrieve(checkout_id);
    return res.status(200).json({ checkout });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//UPDATE CHECKOUT

exports.updateCheckout = async (req, res, next) => {
  const { checkout_id } = req.params;
  if (!checkout_id) return res.status(404).json({ message: "Invalid URL" });
  const { name, description } = req.body;

  try {
    const updatedCheckout = await Checkout.updateById(checkout_id, {
      name,
      description
    });
    return res.status(201).json({ updatedCheckout, message: "Update was sucessful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE CHECKOUT
exports.deleteCheckout = async (req, res, next) => {
  const { checkout_id } = req.params;
  if (!checkout_id) return res.status(404).json({ message: "Invalid URL" });
  try {
    await Checkout.deleteById(checkout_id);
    return res.status(200).json({ message: "checkout deleted sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
