const express = require('express')
const router = express.Router()
let members = require('../../Members');
const uuid = require('uuid')

router.get('/', (req, res) => res.json(members))

router.get('/:id', (req, res) => {
    const id = req.params.id
    // res.send(`Requested member id #${id}`)
    // const member_found_by_id = members.some(member => member.id === parseInt(id))
    const member_found_by_id = members.filter(member => member.id === parseInt(id))

    if (member_found_by_id.length !==0) {
        res.json(member_found_by_id)
    } else {
        res.status(400).json({ msg: `Member id #${id} not found` })
    }
})

// Create member
router.post('/', (req, res) => {
    // res.json(req.body)
    // res.send(req.body)
    // res.send("hello post")

    const uid = uuid.v4()

    const newMember = {
        id: uid,
        name: req.body.name,
        email: req.body.email,
        status: req.body.active
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please post both, user name and email' })
    }

    members.push(newMember)
    // res.json(members.filter(member => member.id === uid))
    const addedMember = members.filter(member => member.id === uid)
    res.json({ msg: 'New member added:', addedMember, members})

})

const member_by_id = id => members.filter(member => member.id === parseInt(id))

// Update member
router.put('/:id', (req, res) => {
    const id = req.params.id
    const newName = req.body.name;
    const newEmail = req.body.email;

    // const member_by_id = id => members.filter(member => member.id === parseInt(id))

    const memberBeforeUpdate = member_by_id(id)

    if (newName && newEmail && memberBeforeUpdate.length > 0) {
        members.forEach(member => {
            if ( member.id === parseInt(id) ) {
                member.name = newName;
                member.email = newEmail;
            }
        })
        const memberAfterUpdate = member_by_id(id)
        res.json({ msg: `Member id #${id} update requested ...`, memberBeforeUpdate, memberAfterUpdate, members})
    } else {
        return res.status(400).json({ msg: `Please put both, new user name, email and valid id #${id}` })
    }
})

// Delete member
router.delete('/:id', (req, res) => {
    const id = req.params.id
    // const newName = req.body.name;
    // const newEmail = req.body.email;

    // const member_by_id = id => members.filter(member => member.id === parseInt(id))

    const memberBeforeDelete = member_by_id(id)

    if (memberBeforeDelete.length > 0) {
        members = members.filter(member => member.id !== parseInt(id))
        res.json({ msg: `Member id #${id} deletion requested ...`, memberBeforeDelete, members})
    } else {
        return res.status(400).json({ msg: `Can not find member with id #${id}` })
    }
})

module.exports = router;
