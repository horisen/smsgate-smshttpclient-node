"use strict";

const Client = require("./Client.js");

module.exports = {
    Client: Client,
    // TypeText is SMS type for sending text SMS
    TYPE_TEXT: 'text',
    // TypeWSI is SMS type for sending Binary WAP Service Indication SMS
    TYPE_WSI: 'wsi',
    // DCSGSM is data coding scheme - GSM
    DCS_GSM: 'gsm',
    // DCSUCS is data coding scheme - UCS2
    DCS_UCS: 'ucs',
    DLR_MASK_DELIVERED: 1,
    DLR_MASK_UNDELIVERED: 2,
    DLR_MASK_BUFFERED: 4,
    DLR_MASK_SENTTOSMSC: 8,
    DLR_MASK_REJECTED: 16,
    DLR_MASK_NONE: 0,
    DLR_MASK_STANDARD: 1 | 2 | 16,
    // DLREventDelivered is DLR event when SMS is delivered
    DLR_EVENT_DELIVERED: 'DELIVERED',
    // DLREventUndelivered is DLR event when SMS is udelivered
    DLR_EVENT_UNDELIVERED: 'UNDELIVERED',
    // DLREventBuffered  is DLR event when SMS is buffered
    DLR_EVENT_BUFFERED: 'BUFFERED',
    // DLREventSentToSMSC  is DLR event when SMS is sent to SMSC
    DLR_EVENT_SENTTOSMSC: 'SENT_TO_SMSC',
    // DLREventRejected  is DLR event when SMS is rejected
    DLR_EVENT_REJECTED: 'REJECTED',
    // DLREventExpired  is DLR event when SMS is expired
    DLR_EVENT_EXPIRED: 'EXPIRED',
    // DLREventUnknown  is DLR event when SMS is unknown
    DLR_EVENT_UNKNOWN: 'UNKNOWN',    
};