import pyshark
from datetime import datetime
import os


class PacketCapture:
    def __init__(self, interface: str, log_path: str):
        self.interface = interface
        self.log_path = log_path
        self.packet_data = []

        # Ensure the log directory and file exist
        self.ensure_log_path()

    def ensure_log_path(self):
        """
        Ensure that the directory and log file exist.
        """
        log_dir = os.path.dirname(self.log_path)
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
            # print(f"Created directory: {log_dir}")
        if not os.path.exists(self.log_path):
            with open(self.log_path, "w") as f:
                f.write("")
            # print(f"Created log file: {self.log_path}")

    def capture_packets(self):
        """
        Capture packets using PyShark for the specified interface.
        """
        # print(f"Starting packet capture on interface {self.interface}...")

        # Set up the capture using PyShark LiveCapture
        capture = pyshark.LiveCapture(interface=self.interface)

        try:
            # Start sniffing packets continuously
            for packet in capture.sniff_continuously():
                packet_info = self.process_packet(packet)
                if packet_info:
                    self.packet_data.append(packet_info)
                    self.write_to_log(packet_info)
        except Exception as e:
            print(f"Error during packet capture: {e}")
        finally:
            capture.close()

    def process_packet(self, packet):
        """
        Process each packet to extract the relevant information.
        """
        try:
            protocol = (
                packet.transport_layer
                if hasattr(packet, "transport_layer")
                else "Unknown"
            )
            src_ip = packet.ip.src if hasattr(packet, "ip") else "Unknown"
            dst_ip = packet.ip.dst if hasattr(packet, "ip") else "Unknown"
            src_port = packet[protocol].srcport if protocol != "Unknown" else "Unknown"
            dst_port = packet[protocol].dstport if protocol != "Unknown" else "Unknown"

            flags = self.get_flags(packet) if protocol == "TCP" else None

            # Packet meta information
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            packet_length = packet.length
            flow_id = self.calculate_flow_id(
                src_ip, src_port, dst_ip, dst_port, protocol
            )

            label = "Unknown"

            # # Verbose output
            # print(
            #     f"Captured packet: {src_ip}:{src_port} -> {dst_ip}:{dst_port} [{protocol}]"
            # )

            return {
                "Timestamp": timestamp,
                "Protocol": protocol,
                "Flags": flags,
                "Packets": 1,
                "Bytes": packet_length,
                "Flows": flow_id,
                "Label": label,
                "Source IP": src_ip,
                "Source Port": src_port,
                "Destination IP": dst_ip,
                "Destination Port": dst_port,
            }
        except AttributeError as e:
            print(f"Error processing packet: {e}")
            return None

    def get_flags(self, packet):
        """
        Extract the TCP flags from the packet.
        """
        try:
            return packet.tcp.flags
        except AttributeError:
            return None

    def calculate_flow_id(self, src_ip, src_port, dst_ip, dst_port, protocol):
        """
        Create a unique flow identifier based on 5-tuple (src_ip, src_port, dst_ip, dst_port, protocol).
        """
        return f"{src_ip}:{src_port}-{dst_ip}:{dst_port}-{protocol}"

    def write_to_log(self, packet_info):
        """
        Write packet information to the log file.
        """
        log_line = (
            f"Timestamp: {packet_info['Timestamp']}, Protocol: {packet_info['Protocol']}, "
            f"Flags: {packet_info['Flags']}, Packets: {packet_info['Packets']}, "
            f"Bytes: {packet_info['Bytes']}, Flows: {packet_info['Flows']}, "
            f"Label: {packet_info['Label']}, Source IP: {packet_info['Source IP']}, "
            f"Source Port: {packet_info['Source Port']}, Destination IP: {packet_info['Destination IP']}, "
            f"Destination Port: {packet_info['Destination Port']}\n"
        )

        with open(self.log_path, "a") as log_file:
            log_file.write(log_line)

    def summarize_capture(self):
        """
        Summarize the captured packet data.
        """
        summary = {
            "Total Packets": len(self.packet_data),
            "Total Bytes": sum(int(pkt["Bytes"]) for pkt in self.packet_data),
            "Unique Flows": len(set(pkt["Flows"] for pkt in self.packet_data)),
        }
        return summary

    def display_packet_data(self):
        """
        Display detailed packet information.
        """
        for pkt in self.packet_data:
            print(
                f"Timestamp: {pkt['Timestamp']}, Protocol: {pkt['Protocol']}, Flags: {pkt['Flags']}, "
                f"Packets: {pkt['Packets']}, Bytes: {pkt['Bytes']}, Flows: {pkt['Flows']}, "
                f"Label: {pkt['Label']}, Source IP: {pkt['Source IP']}, Source Port: {pkt['Source Port']}, "
                f"Destination IP: {pkt['Destination IP']}, Destination Port: {pkt['Destination Port']}"
            )


if __name__ == "__main__":
    # Configuration
    interface = "eth0"
    log_file_path = "/var/ossec/capture/packets.log"

    # Ensure root permissions
    if os.geteuid() != 0:
        print("Please run the script as root!")
        exit()

    # Create PacketCapture object and start capturing packets
    packet_capture = PacketCapture(interface=interface, log_path=log_file_path)
    packet_capture.capture_packets()

    # Display captured packet data
    packet_capture.display_packet_data()
