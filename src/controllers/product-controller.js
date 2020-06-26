'use string'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    res.status(200).send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug)
    res.status(200).send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id)
    res.status(200).send(data)
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag)
    res.status(200).send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.post = async (req, res, next) => {
  try {
    let contract = new ValidationContract()
    contract.hasMinLen(
      req.body.title,
      3,
      'O titulo deve conter pelo menos 3 caracteres'
    )
    contract.hasMinLen(
      req.body.slug,
      3,
      'O slug deve conter pelo menos 3 caracteres'
    )
    contract.hasMinLen(
      req.body.description,
      3,
      'O description deve conter pelo menos 3 caracteres'
    )

    if (!contract.isValid()) {
      res.status(400).send(contract.errors()).end()
      return
    }

    await repository.create(req.body)
    res.status(201).send({ message: 'Produto cadastrado com sucesso!' })
  } catch (e) {
    res.status(400).send({ message: 'Falha ao cadastrar o produto', data: e })
  }
}

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body)
    res.status(200).send({
      message: 'Produto atualizado com sucesso!'
    })
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao atualizar o produto',
      data: e
    })
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.remove(req.body.id)
    res.status(200).send({
      message: 'Sucesso ao remover o produto'
    })
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao remover o produto',
      data: e
    })
  }
}
