import React from 'react';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import logoImage from '../img/logo.png';
import qrImage from '../img/QR.png';
import { FaRegFilePdf } from 'react-icons/fa';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
    },
    container: {
        border: '2px solid black',
        borderRadius: 10,
        padding: 20,
        position: 'relative',
        width: 500,
        height: 300,
        margin: '0 auto 40px auto', // Yukarıdan boşluk ekleyerek container'ı yukarı taşıyabilirsiniz
        backgroundColor: '#f7f7f7',
    },
    logo: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 120,
        height: 60,
    },
    qr: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 80,
        height: 80,
        border: '10px solid black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    passengerName: {
        position: 'absolute',
        top: 100,
        left: 20,
        fontSize: 12,
    },
    info: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        fontSize: 12,
    },
    ticketNumber: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 12,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '50%',
        borderStyle: 'none',
        padding: 5,
    },
    tableCell: {
        fontSize: 10,
    },
});

const MyDocument = ({ ticketId, ticketOwner, ticketDate, ticketFrom, ticketTo, ticketTime }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                <Image src={logoImage} style={styles.logo} />
                <Image src={qrImage} style={styles.qr} />
                <Text style={styles.passengerName}>Passenger Name: {ticketOwner}</Text>
                <View style={styles.info}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Ticket ID:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{ticketId}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Ticket Date:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{ticketDate}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>From:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{ticketFrom}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>To:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{ticketTo}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Departure Time:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{ticketTime} AM</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

const TicketInformation = () => {
    const ticketData = {
        ticketId: '12345',
        ticketOwner: 'John Doe',
        ticketDate: '2024-06-02',
        ticketFrom: 'Istanbul',
        ticketTo: 'Ankara',
        ticketTime: '08:00',
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <PDFDownloadLink document={<MyDocument {...ticketData} />} fileName="ticket.pdf">
                {({ loading }) => (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FaRegFilePdf style={{ marginRight: '5px' }} />
                        <span>Download PDF</span>
                    </div>
                )}
            </PDFDownloadLink>
        </div>
    );
};

export default TicketInformation;
