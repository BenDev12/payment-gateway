const express = require("express");
const coinbase = require("coinbase-commerce-node");
const { api } = require("../config/index");
const Client = coinbase.Client;
Client.init("API");
const Charge = coinbase.resources.Charge;

// CREATE A CHARGE

exports.createCharge = async (req, res, next) => {
  const {
    name,
    description,
    pricing_type,
    local_price: { amount, currency }
  } = req.body;
  try {
    const newCharge = await Charge.create({
      name: name,
      description: description,
      pricing_type: pricing_type,
      local_price: { amount: amount, currency: amount }
    });
    return res.status(200).json({ newCharge });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LIST ALL CHARGES

exports.listCharges = async (req, res, next) => {
  try {
    const chargeList = await Charge.list({ order: "asc", limit: 5 });
    return res.status(200).json({ chargeList });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LIST A SINGLE CHARGE

exports.showAcharge = async (req, res, next) => {
  const { charge_id } = req.params;
  if (!charge_id) return res.status(404).json({ message: "Invalid URL" });
  try {
    const charge = await Charge.retrieve(charge_id);
    return res.status(200).json({ charge });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CANCEL A CHARGE
// Only new charges can be successfully canceled. Once payment is detected, charge can no longer be canceled.
exports.cancelCharge = async (req, res, next) => {
  const { charge_code } = req.params;
  if (!charge_code) return res.status(404).json({ message: "Invalid URL" });
  try {
    await Charge.retrieve(charge_code);
    return res.status(200).json({ message: "charge canceled" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// RESOLVE A CHARGE

exports.resolveCharge = async (req, res, next) => {
  const { charge_code } = req.params;
  if (!charge_code) return res.status(404).json({ message: "Invalid URL" });
  try {
    await Charge.retrieve(charge_code);
    return res.status(200).json({ message: "charge is resolved" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
