module.exports = function validateDrug(req, res, next) {
    const { name, dosage, card, pack, perDay } = req.body;

    // a. Name has length > 5
    if (!name || name.length <= 5) {
        return res.status(400).send({ message: "Drug name must be longer than 5 characters" });
    }

    // b. Dosage format: XX-morning,XX-afternoon,XX-night (X is digit)
    const dosageRegex = /^\d+-morning,\d+-afternoon,\d+-night$/;
    if (!dosageRegex.test(dosage)) {
        return res.status(400).send({ message: "Dosage format must be like '10-morning,20-afternoon,30-night'" });
    }

    // c. Card > 1000
    if (!card || card <= 1000) {
        return res.status(400).send({ message: "Card must be more than 1000" });
    }

    // d. Pack > 0
    if (!pack || pack <= 0) {
        return res.status(400).send({ message: "Pack must be more than 0" });
    }

    // e. PerDay > 0 and < 90
    if (!perDay || perDay <= 0 || perDay >= 90) {
        return res.status(400).send({ message: "PerDay must be between 1 and 89" });
    }

    // Nếu qua hết thì cho đi tiếp
    next();
};