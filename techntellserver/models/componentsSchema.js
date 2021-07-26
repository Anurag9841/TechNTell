const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

var repeatedSchema = {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Currency,
    required: true,
    min: 0,
  },
  tax: {
    type: Currency,
    required: true,
    min: 0,
  },
  discount: {
    type: Currency,
    required: true,
    min: 0,
  },
};

var CPUSchema = new Schema(
  {
    ...repeatedSchema,
    core_count: {
      type: Number,
      required: true,
    },
    TDP: {
      type: Number,
      required: true,
    },
    integrated_graphics: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CPUCoolerSchema = new Schema(
  {
    ...repeatedSchema,
    fan_rpm: {
      type: String,
    },
    noise_level: {
      type: String,
    },
    Color: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const motherboardSchema = new Schema(
  {
    ...repeatedSchema,
    memory_slots: {
      type: Number,
      requried: true,
    },
    memory_max: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const memorySchema = new Schema({
  ...repeatedSchema,
  speed: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price_per_gb: {
    type: Currency,
    required: true,
  },
  modules: {
    type: String,
    required: true,
  },
});

const storageSchema = new Schema({
  ...repeatedSchema,
  capacity: {
    type: String,
    required: true,
  },
  price_per_gb: {
    type: Currency,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const videoCardSchema = new Schema({
  ...repeatedSchema,
  chipset: {
    type: String,
    required: true,
  },
  boost_clock: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  memory: {
    type: Number,
    required: true,
  },
});

const caseSchema = new Schema({
  ...repeatedSchema,
  type: {
    type: String,
    required: true,
  },
  side_panel_window: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const powerSupplySchema = new Schema({
  ...repeatedSchema,
  form_factor: {
    type: String,
  },
  efficiency_rating: {
    type: String,
    required: true,
  },
  wattage_in_watts: {
    type: Number,
    required: true,
  },
});

const OSSchema = new Schema({
  ...repeatedSchema,
  type: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  max_supported_memory_in_GB: {
    type: Number,
  },
});

const monitorSchema = new Schema({
  ...repeatedSchema,
  screenSize: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    required: true,
  },
  refresh_rate_in_hz: {
    type: String,
    required: true,
  },
  aspect_ratio: {
    type: String,
  },
});

var CPUModel = mongoose.model("CPU", CPUSchema, "products");
var CPUCoolerModel = mongoose.model("CPUCooler", CPUCoolerSchema, "products");
var MotherboardModel = mongoose.model(
  "Motherboard",
  motherboardSchema,
  "products"
);

var MemoryModel = mongoose.model("Memory", memorySchema, "products");
var StorageModel = mongoose.model("Storage", storageSchema, "products");
var VideoCardModel = mongoose.model("Video_Card", videoCardSchema, "products");
var CaseModel = mongoose.model("Case", caseSchema, "products");
var PowerSupplyModel = mongoose.model(
  "PowerSupply",
  powerSupplySchema,
  "products"
);
var OSModel = mongoose.model("OS", OSSchema, "products");
var MonitorModel = mongoose.model("Monitor", monitorSchema, "products");

module.exports = {
  CPUModel,
  CPUCoolerModel,
  MotherboardModel,
  MemoryModel,
  StorageModel,
  VideoCardModel,
  CaseModel,
  PowerSupplyModel,
  OSModel,
  MonitorModel,
};
